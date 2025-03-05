export const ApiError = ({
  message = 'Erro ao processar a requisição',
  headers = {
    'Content-Type': 'application/json',
  },
  status = 400,
}) => {
  return new Response(JSON.stringify({ message }), {
    status,
    headers,
  })
}
