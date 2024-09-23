import {QueryKey, useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";

interface MutationConfig<TData, TError, TVariables, TContext> {
    mutationFn: (variables: TVariables) => Promise<TData>;
    invalidateQueries?: QueryKey[];
    onSuccess?: (data: TData, variables: TVariables, context: TContext) => void | Promise<unknown>;
    onError?: (error: TError, variables: TVariables, context: TContext) => void | Promise<unknown>;
}

function useGenericMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
    config: MutationConfig<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
    const queryClient = useQueryClient();

    return useMutation<TData, TError, TVariables, TContext>({
        mutationFn: config.mutationFn,
        onSuccess: (data, variables, context) => {
            if (config.invalidateQueries) {
                config.invalidateQueries.forEach(queryKey => {
                    queryClient.invalidateQueries({ queryKey });
                })
            }
            if (config.onSuccess) {
                config.onSuccess(data, variables, context)
            }
        },
        onError: (error, variables, context) => {
            if (config.onError) {
                config.onError(error, variables, context!)
            }
        },
    })
}

export default useGenericMutation;