import { Column, Link } from '@react-email/components'

import { Headline } from './Headline'

export const PaymentMethods = ({ nfse }: { nfse: string }) => {
  return (
    <>
      <Column className="w-full align-top">
        <Headline variant="primary" size="base" type={'display'} as="h2">
          Nota Fiscal Eletrônica de Serviço
        </Headline>
        <Link
          href={nfse}
          className="m-0 p-0 text-xs leading-tight text-gray-700"
        >
          {nfse}
        </Link>
      </Column>
    </>
  )
}
