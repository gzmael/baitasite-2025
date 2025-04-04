import { Column, Section, Text, Img } from '@react-email/components'

import { Farewell } from './components/Farewell'
import { Footer } from './components/Footer'
import { Layout } from './components/Layout'
import { SectionMiddle } from './components/SectionMiddle'

const UpdatePrice = () => {
  const previewText = 'Comunicado Importante'

  return (
    <Layout previewText={previewText}>
      <Section className="mx-auto w-[600px] rounded-t-lg bg-white px-[20px]">
        <Column>&nbsp;</Column>
      </Section>
      <SectionMiddle className="p-0">
        <Column>
          <Img
            src="https://uploadthing.com/f/b29a4985-16fe-4425-b398-d5482d406918-wpq2k6.png"
            alt="Cover Comunicado"
            width="100%"
            height={250}
          />
        </Column>
      </SectionMiddle>
      <SectionMiddle>
        <Column>
          <Text className="mb-2 mt-4 p-0 text-center text-base leading-tight text-gray-700">
            Prezado(a) cliente,
          </Text>
        </Column>
      </SectionMiddle>
      <SectionMiddle>
        <Column>
          <Text className="my-2 p-0 text-center text-base font-bold leading-tight text-gray-700">
            Gostaríamos de comunicar que, a partir do próximo mês, haverá um
            reajuste de 10% na mensalidade dos nossos planos. Esse reajuste tem
            como objetivo ajustar os valores da inflação e cobrir o aumento dos
            custos estruturais para prestação de nossos serviços.
          </Text>
          <Text className="my-2 p-0 text-center text-base leading-tight text-gray-700">
            Sabemos que esse é um momento delicado para todos, mas esse aumento
            é necessário para garantir a qualidade, a segurança e a estabilidade
            dos serviços que oferecemos. Estamos sempre buscando melhorias
            técnicas e estruturais para atender às suas necessidades e
            expectativas.
          </Text>
          <Text className="my-2 p-0 text-center text-base leading-tight text-gray-700">
            Esperamos contar com a sua compreensão e colaboração. Em caso de
            dúvidas, entre em contato conosco pelo nosso canal de atendimento.
          </Text>
        </Column>
      </SectionMiddle>
      <Farewell />
      <Footer />
    </Layout>
  )
}
export default UpdatePrice
