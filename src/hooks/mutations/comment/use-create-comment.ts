import { createComment } from "@/api/comment";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { Comment, UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateComment(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      // 이 방법 쓰려면 onSuccess 매개변수 _data, variables 써야함
      // queryClient.invalidateQueries({
      //   queryKey: QUERY_KEYS.comment.post(variables.postId),
      // });
      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(newComment.post_id),
        (comments) => {
          if (!comments)
            throw new Error("댓글이 캐시 데이터에 보관되어 있지 않습니다.");
          if (!profile)
            throw new Error("사용자의 프로필 정보를 찾을 수 없습니다.");
          return [...comments, { ...newComment, author: profile }];
        },
      );
      //지금 쓰는건 낙관적 업데이트 방식
      //지금 기준으로는 새 댓글이 아래로 감, 필요시 return문 내부 순서 변경

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
