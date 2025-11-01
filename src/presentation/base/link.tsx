import NextLink from 'next/link';
import {LinkBox, LinkBoxProps, LinkOverlay} from '@chakra-ui/react';
import React from 'react';

export interface LinkProps extends LinkBoxProps {
  href?: string;
  isExternal?: boolean;
  locale?: string | false | undefined;
}

const createLink = ({
  href,
  isExternal,
  locale,
  children,
  ...rest
}: LinkProps) => {
  if (!href) {
    return <>{children}</>;
  }
  return (
    <LinkBox {...rest}>
      {/*/ https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag */}
      <NextLink href={href} passHref locale={locale} legacyBehavior>
        <LinkOverlay isExternal={isExternal}>{children}</LinkOverlay>
      </NextLink>
    </LinkBox>
  );
};

export const Link = React.memo(createLink);
