export interface ApiErrorResponse {
	status: number
	data: { 
      message: string; 
      errors: (ValidationError | string)[]
   }
}

export type ValidationError = {
   type: string,
   msg?: string,
   path?: string,
   location?: string
}

export function isApiError(error: unknown): error is ApiErrorResponse {
	return (
		typeof error === 'object' &&
		error != null &&
		'status' in error &&
		typeof (error as any).status === 'number'
	)
}
