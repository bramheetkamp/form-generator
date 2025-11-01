import React, {memo} from 'react';
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import {SearchIcon} from '@/presentation/base/icon/search';
import {CloseIcon} from '@/presentation/base/icon/close';
import useTranslation from 'next-translate/useTranslation';
import {TransparentIconButton} from '@/presentation/base/button/transparentIconButton';

interface Props extends InputProps {
  value: string;
  onValueChanged: (text: string) => void;
}

export const SearchField = memo(
  ({w, width, value, onValueChanged, ...rest}: Props) => {
    const {t} = useTranslation('common');
    return (
      <InputGroup w={w || width}>
        <Input
          variant={'searchField'}
          {...rest}
          onChange={event => {
            event.preventDefault();
            onValueChanged(event.target.value);
          }}
          value={value}
        />
        <InputRightElement w={'unset'} right={'4'}>
          <TransparentIconButton
            display={value.length ? 'inherit' : 'none'}
            onClick={() => {
              onValueChanged('');
            }}
            label={t('clearInput')}
            mr={'2'}
            icon={<CloseIcon />}
          />
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    );
  }
);
