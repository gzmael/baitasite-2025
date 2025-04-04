import { Font, Head } from '@react-email/components'

const HeadMail = () => {
  return (
    <Head>
      <Font
        fontFamily="Alata"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gstatic.com/s/alata/v9/PbytFmztEwbIoce9zqY.woff2',
          format: 'woff2',
        }}
        fontStyle="normal"
        fontWeight={400}
      />
      <Font
        fontFamily="Open Sans"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2',
          format: 'woff2',
        }}
        fontStyle="normal"
        fontWeight={400}
      />
      <Font
        fontFamily="Poppins"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2',
          format: 'woff2',
        }}
        fontStyle="normal"
        fontWeight={500}
      />
      <Font
        fontFamily="Poppins"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2',
          format: 'woff2',
        }}
        fontStyle="normal"
        fontWeight={600}
      />
    </Head>
  )
}

export { HeadMail }
