import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export type MetaTagType = React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[] | undefined
export type LinkTagType = React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>[] | undefined

export interface Props {
  propMetaDescription?: string,
  lang?: string,
  meta?: MetaTagType
  link?: LinkTagType
  title?: string,
}

const SEO: FC<Props> = ({ propMetaDescription, lang = 'en', meta = [], link = [], title, }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = propMetaDescription || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title || site.siteMetadata.title}

      link={[
        { rel: 'icon', href: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNLFhxACGcLq3CZV0_a_TQv6jgKy-MPTJrJA&usqp=CAU" },
        ...link
      ]}

      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title || site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title || site.siteMetadata.title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...meta
      ]}
    />
  )
}

export default SEO
