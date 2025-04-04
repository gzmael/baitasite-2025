import { Column, Link } from '@react-email/components'

import { Headline } from './Headline'

export const PaymentMethods = ({ nfse }: { nfse: string }) => {
  const url = `https://www.pmat.com.br/notafiscal/NFA/Empresa/EmpresaImprimirNF.aspx?nome=${nfse}`
  return (
    <>
      <Column className="w-full align-top">
        <Headline variant="primary" size="base" type={'display'} as="h2">
          Nota Fiscal Eletrônica de Serviço
        </Headline>
        <Link
          href={url}
          className="m-0 p-0 text-xs leading-tight text-gray-700"
        >
          {url}
        </Link>
      </Column>
    </>
  )
}
