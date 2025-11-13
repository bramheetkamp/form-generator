import {
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Spacer,
  Text,
  useTheme,
} from '@chakra-ui/react';
import React, {memo, useState} from 'react';
import Select, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValue,
  MultiValueGenericProps,
  NoticeProps,
  OptionProps,
  Props,
  ValueContainerProps,
} from 'react-select';
import useTranslation from 'next-translate/useTranslation';
import {LabelValue} from '@/presentation/base/input/labelValue';
import {CloseIcon} from '@/presentation/base/icon/close';
import {ChevronDownIcon} from '@/presentation/base/icon/chevron';
import {ErrorIcon} from '@/presentation/base/icon/error';
import CreatableSelect from 'react-select/creatable';
import {omit} from 'lodash';
import {TransparentIconButton} from '@/presentation/base/button/transparentIconButton';
import {CustomFillCheckbox} from '@/presentation/base/input/customFillCheckbox';

export enum DropdownType {
  SINGLE_NON_CREATABLE,
  SINGLE_CREATABLE,
  MULTI_NON_CREATABLE,
  MULTI_CHECKBOX,
}

interface BaseDropdownFieldProps<T> extends BoxProps {
  type: DropdownType;
  items?: LabelValue<T>[];
  onInputChanged?: (text: string) => void;

  isClearable?: boolean;
  isDisabled?: boolean;
  errorText?: string;
  placeholder?: string;
  icon?: JSX.Element;
  fieldBackgroundColor?: string;
  hint?: string;
  isSmallVariant?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';

  // Text shown when there are no options/items
  noOptionsText?: string;

  // Text used to override the value shown in the input
  inputText?: string;
}

interface SingleNonCreatableDropdownFieldProps<T>
  extends BaseDropdownFieldProps<T> {
  type: DropdownType.SINGLE_NON_CREATABLE;
  item: T | undefined;
  onItemSelected: (item: LabelValue<T> | undefined) => void;
}

interface SingleCreatableDropdownFieldProps<T>
  extends BaseDropdownFieldProps<T> {
  type: DropdownType.SINGLE_CREATABLE;
  item: T | undefined;
  onItemSelected: (item: LabelValue<T> | undefined) => void;
  onCreateOption: (text: string) => void;
  isLoading: boolean;
  formatCreateLabel?: (text: string) => string;
}

interface MultipleDropdownFieldProps<T> extends BaseDropdownFieldProps<T> {
  type: DropdownType.MULTI_NON_CREATABLE;
  selectedItems: LabelValue<T>[];
  onItemsSelected: (items: LabelValue<T>[]) => void;
}

interface MultipleCheckboxDropdownFieldProps<T>
  extends BaseDropdownFieldProps<T> {
  type: DropdownType.MULTI_CHECKBOX;
  selectedItems: LabelValue<T>[];
  onItemsSelected: (items: LabelValue<T>[]) => void;
}

export type DropdownFieldProps<T> =
  | SingleNonCreatableDropdownFieldProps<T>
  | SingleCreatableDropdownFieldProps<T>
  | MultipleDropdownFieldProps<T>
  | MultipleCheckboxDropdownFieldProps<T>;

function createDropdownField<T>(props: DropdownFieldProps<T>) {
  const [isFocus, setFocus] = useState(false);
  const chakraTheme = useTheme();

  const {
    type,
    items,
    onInputChanged,
    isDisabled,
    errorText,
    fieldBackgroundColor,
    placeholder = 'selects',
    onBlur,
    icon,
    noOptionsText,
    w,
    width,
    isSmallVariant,
    isClearable,
    hint,
    menuPlacement,
    inputText,
    ...rest
  } = props;

  const isMulti =
    type === DropdownType.MULTI_NON_CREATABLE ||
    type === DropdownType.MULTI_CHECKBOX;

  const SearchIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        {errorText ? (
          <ErrorIcon />
        ) : (
          icon || <ChevronDownIcon boxSize={'5'} color={'brand.500'} />
        )}
      </components.DropdownIndicator>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const NoOptionsComponent = (props: NoticeProps) => {
    return (
      <components.NoOptionsMessage {...props}>
        <Text textColor={'placeholder'}>{noOptionsText || 'noResults'}</Text>
      </components.NoOptionsMessage>
    );
  };

  /**
   * Customise option component for multiple checkbox dropdown
   */
  const Option = (props: OptionProps) => {
    if (type !== DropdownType.MULTI_CHECKBOX) {
      return <components.Option {...props} />;
    }
    const {
      isSelected,
      label,
      data: {checkboxColor, checkboxHoverColor},
    } = props as OptionProps<LabelValue<T>>;
    return (
      <components.Option {...props}>
        <HStack>
          <Text>{label}</Text>
          <Spacer />
          <CustomFillCheckbox
            isChecked={isSelected}
            customFill={checkboxColor}
            customFillHover={checkboxHoverColor}
          />
        </HStack>
      </components.Option>
    );
  };

  /**
   * Don't show selected items in input for multiple checkbox dropdown
   */
  const MultiValueContainer = (
    props: MultiValueGenericProps<LabelValue<T>>
  ) => {
    if (type !== DropdownType.MULTI_CHECKBOX) {
      return <components.MultiValueContainer {...props} />;
    }
    return null;
  };

  /**
   * Used to override the selected value and show custom text instead
   */
  const ValueContainer = (props: ValueContainerProps) => {
    if (!inputText) {
      return <components.ValueContainer {...props} />;
    }
    return (
      <components.ValueContainer {...props}>
        <Text pl={'4'}>{inputText}</Text>
        {props.children}
      </components.ValueContainer>
    );
  };

  // Remove all these properties from Props because they're not needed in Box
  const boxProps = omit(rest, [
    'type',
    'item',
    'onItemSelected',
    'onCreateOption',
    'isLoading',
    'formatCreateLabel',
    'selectedItems',
    'onItemsSelected',
  ]);

  const height = Math.min((items?.length ?? 0) * 60, 300);
  return (
    <FormControl isInvalid={!!errorText} w={w || width || 'full'}>
      <Box
        w={w || width || 'full'}
        borderRadius={isSmallVariant ? '1' : '1.5'}
        borderColor={errorText ? 'red.500' : isFocus ? 'brand.500' : 'gray.200'}
        borderWidth={'1px'}
        shadow={isSmallVariant ? 'unset' : 'roleContainer'}
        alignItems={'center'}
        justifyItems={'center'}
        bg={isDisabled ? 'gray.50' : 'white'}
        maxWidth={'inherit'}
        height={isMulti ? 'auto' : isSmallVariant ? '8' : '11'}
        {...boxProps}
      >
        <SelectWrapper
          isCreatable={type === DropdownType.SINGLE_CREATABLE}
          onCreateOption={text => {
            if (type === DropdownType.SINGLE_CREATABLE) {
              props.onCreateOption(text);
            }
          }}
          isLoading={
            type === DropdownType.SINGLE_CREATABLE ? props.isLoading : false
          }
          formatCreateLabel={text => {
            if (type === DropdownType.SINGLE_CREATABLE) {
              return props.formatCreateLabel?.(text) ?? `Aammaken "${text}"`;
            }
            return '';
          }}
          menuPlacement={menuPlacement ?? 'auto'}
          minMenuHeight={height}
          isMulti={isMulti}
          onFocus={() => setFocus(true)}
          onBlur={e => {
            onBlur?.(e);
            setFocus(false);
          }}
          placeholder={placeholder}
          options={items}
          isDisabled={isDisabled}
          isClearable={isClearable}
          hideSelectedOptions={type !== DropdownType.MULTI_CHECKBOX}
          closeMenuOnSelect={!isMulti}
          styles={{
            option: (provided, {isFocused, isDisabled}) => ({
              ...provided,
              color: isDisabled
                ? chakraTheme.colors.gray['500']
                : chakraTheme.colors.gray['800'],
              background: isDisabled
                ? chakraTheme.colors.gray['50']
                : isFocused
                ? chakraTheme.colors.brand['300']
                : 'transparent',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              padding: 13,
              fontStyle: isDisabled ? 'italic' : 'normal',
            }),
            container: base => ({
              ...base,
              height: isMulti
                ? 'auto'
                : chakraTheme.sizes[isSmallVariant ? '7' : '11'],
              minHeight: 'unset',
              width: '100%',
            }),
            control: (base, {isDisabled}) => ({
              ...base,
              alignItems: 'start',
              boxShadow: 'none',
              paddingLeft: isSmallVariant
                ? chakraTheme.space['2']
                : chakraTheme.space['4'],
              paddingRight: isSmallVariant
                ? chakraTheme.space['2']
                : chakraTheme.space['4'],
              borderWidth: '0px',
              padding: chakraTheme.space['0'],
              minHeight: 'unset',
              background: 'transparent',
              height: isMulti
                ? 'auto'
                : chakraTheme.sizes[isSmallVariant ? '6' : '10.5'],
              '&:hover': {},
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }),
            placeholder: base => ({
              ...base,
              color: errorText
                ? chakraTheme.colors.red['700']
                : chakraTheme.colors.gray['500'],
              textOverflow: 'ellipsis',
              maxWidth: '90%',
              margin: '0',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'initial',
              paddingLeft: chakraTheme.space[isSmallVariant ? '2' : '4'],
            }),
            dropdownIndicator: base => ({
              ...base,
              padding: '0',
            }),
            indicatorSeparator: base =>
              isMulti && props.selectedItems && props.selectedItems.length > 0
                ? {...base}
                : {},
            indicatorsContainer: base => ({
              ...base,
              minHeight: 'unset',
              height: chakraTheme.sizes[isSmallVariant ? '7' : '10'],
              marginRight: chakraTheme.space[isSmallVariant ? '1.5' : '3'],
            }),
            menu: base => ({
              ...base,
              borderColor: chakraTheme.colors.brand['500'],
              marginTop: chakraTheme.space['2'],
              zIndex: 999,
            }),
            menuList: base => ({
              ...base,
              maxHeight: chakraTheme.sizes.dropdown.maxH,
              overflowY: 'auto',
              '::-webkit-scrollbar': {
                width: chakraTheme.sizes['3'],
              },
              '::-webkit-scrollbar-track': {
                background: chakraTheme.colors.gray['100'],
              },
              '::-webkit-scrollbar-thumb': {
                background: chakraTheme.colors.brand['500'],
                borderRight: `4px ${chakraTheme.colors.gray['100']} solid`,
                borderLeft: `4px ${chakraTheme.colors.gray['100']} solid`,
              },
              '::-webkit-scrollbar-thumb:hover': {
                background: chakraTheme.colors.brand['700'],
              },
            }),
            input: base => ({
              ...base,
              margin: 0,
              paddingLeft: chakraTheme.space[isSmallVariant ? '2' : '4'],
            }),
            multiValue: base => ({
              ...base,
              borderColor: chakraTheme.colors.brand['700'],
              backgroundColor: chakraTheme.colors.brand['500'],
              borderRadius: chakraTheme.radii['3xl'],
              paddingLeft: chakraTheme.space['2'],
              paddingRight: chakraTheme.space['2'],
              paddingTop: chakraTheme.space['0.5'],
              paddingBottom: chakraTheme.space['0.5'],
            }),
            multiValueLabel: base => ({
              ...base,
              color: chakraTheme.colors.brand['700'],
              fontWeight: 500,
            }),
            valueContainer: base => ({
              ...base,
              minHeight: chakraTheme.sizes[isSmallVariant ? '7' : '10'],
              padding: '0',
            }),
            singleValue: base => ({
              ...base,
              color: fieldBackgroundColor
                ? 'white'
                : isDisabled
                ? chakraTheme.colors.gray['500']
                : 'inherit',
              marginLeft: chakraTheme.space[isSmallVariant ? '2' : '4'],
            }),
          }}
          components={{
            DropdownIndicator: SearchIndicator,
            ClearIndicator: ClearIndicator,
            NoOptionsMessage: NoOptionsComponent,
            Option: Option,
            MultiValueContainer: MultiValueContainer,
            ValueContainer: ValueContainer,
          }}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              // Color bg for non-selected option
              primary25: chakraTheme.colors.gray['200'],
              // Color bg for selected option
              primary: chakraTheme.colors.gray['200'],
            },
          })}
          onChange={value => {
            if (isMulti) {
              const result = value as MultiValue<LabelValue<T>>;
              props.onItemsSelected?.([...result]);
            } else {
              props.onItemSelected?.(
                value ? (value as LabelValue<T>) : undefined
              );
            }
          }}
          onInputChange={onInputChanged}
          value={
            isMulti
              ? props.selectedItems
              : props.item
              ? items?.find(value => value.value === props.item)
              : null
          }
        />
      </Box>

      {errorText ? (
        <FormErrorMessage
          px={'2'}
          mt={'1'}
          w={'full'}
          color={'red.700'}
          fontSize={'sm'}
          lineHeight={'5'}
          letterSpacing={'0.01em'}
        >
          {errorText}
        </FormErrorMessage>
      ) : (
        hint && (
          <HStack>
            <FormHelperText
              px={'2'}
              mt={'1'}
              w={'full'}
              fontSize={'sm'}
              lineHeight={'5'}
              letterSpacing={'0.01em'}
              color={'gray.500'}
            >
              {hint}
            </FormHelperText>
          </HStack>
        )
      )}
    </FormControl>
  );
}

export const ClearIndicator = memo((props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <TransparentIconButton label={'clearInput'} icon={<CloseIcon />} />
    </components.ClearIndicator>
  );
});

export const DropdownField = React.memo(
  createDropdownField
) as typeof createDropdownField;

interface StaticWrapperProps extends Props {
  isCreatable: false;
}

interface CreatableWrapperProps extends Props {
  isCreatable: true;
  onCreateOption: (text: string) => void;
  isLoading: boolean;
  formatCreateLabel: (text: string) => string;
}

type WrapperProps = StaticWrapperProps | CreatableWrapperProps;

/**
 * Wrapper for select component.
 * Required so we can use date picker with chakra values styling
 * https://chakra-ui.com/docs/features/global-styles#styling-non-chakra-elements-globally
 *
 * @param props
 * @constructor
 */
const SelectWrapper = (props: WrapperProps) => {
  if (props.isCreatable) {
    return (
      <CreatableSelect instanceId={'select'} className={'select'} {...props} />
    );
  }
  return <Select instanceId={'select'} className={'select'} {...props} />;
};
