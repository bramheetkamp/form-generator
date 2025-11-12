import React, {memo, useState} from 'react';
import {
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import useTranslation from 'next-translate/useTranslation';
import {CalendarCheckedIcon} from '@/presentation/base/icon/calendar';
import {space} from '@/presentation/style/space';
import {radii} from '@/presentation/style/radii';
import {colors} from '@/presentation/style/colors';
import {lineHeights} from '@/presentation/style/lineHeights';
import {fontSizes} from '@/presentation/style/fontSizes';
import {sizes} from '@/presentation/style/sizes';
import {CloseIcon} from '@/presentation/base/icon/close';
import {TransparentIconButton} from '@/presentation/base/button/transparentIconButton';
import {DateTime} from 'luxon';
import {HorizontalSelectionButton} from '@/presentation/base/button/horizontalSelectionButton';
import {capitalizeFirstLetter} from '@/utils/string';
import {DateFormat, formatDate} from '@/presentation/utils/date';

interface Props extends FormControlProps {
  isClearable?: boolean;
  onDateChanged?: (date?: Date) => void;
  date?: Date;
  showPopperArrow?: boolean;
  errorText?: string;
  maxDate?: Date | null;
  showTimeInput?: boolean;
  placeholder?: string;
  isSmallVariant?: boolean;
  showCalendarIcon?: boolean;
}

export const DatePickerField = memo(
  ({
    date,
    onDateChanged,
    isClearable = false,
    showPopperArrow = false,
    errorText,
    maxDate = new Date(),
    onBlur,
    showTimeInput,
    placeholder,
    isSmallVariant,
    showCalendarIcon = true,
    w,
    width,
    isDisabled,
    ...props
  }: Props) => {
    const [isFocus, setFocus] = useState(false);

    return (
      <FormControl
        isInvalid={!!errorText}
        w={w || width ? w || width : 'full'}
        {...props}
      >
        <Flex
          direction={'row'}
          align={'center'}
          px={isSmallVariant ? '2' : '4'}
          w={'full'}
          background={isDisabled ? 'gray.50' : 'white'}
          borderRadius={isSmallVariant ? '1' : '1.5'}
          borderColor={
            isDisabled
              ? 'gray.200'
              : isFocus
              ? 'brand.500'
              : errorText
              ? 'red.500'
              : 'gray.200'
          }
          borderWidth={'1px'}
          onBlur={e => {
            onBlur?.(e);
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
          }}
          height={isSmallVariant ? '8' : '11'}
          boxShadow={!isSmallVariant ? 'roleContainer' : undefined}
          css={{
            '.react-datepicker': {
              fontFamily: "'Asap', sans-serif",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: fontSizes['md'],
              lineHeight: lineHeights['5.5'],
              border: 'none',
            },
            '.react-datepicker__month-container': {
              background: '#FFFFFF',
              border: `1px solid ${colors.gray['200']}`,
              borderRadius: radii['2'],
              width: '100%',
            },
            '.react-datepicker__header': {
              backgroundColor: colors.white,
              padding: '0',
              border: 'none',
            },
            '.react-datepicker__month': {
              border: 'none',
              margin: '0',
              padding: space['2'],
            },
            '.react-datepicker__week': {
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: space['1'],
            },
            '.react-datepicker__day': {
              color: colors.gray['600'],
              width: sizes['8'],
              height: sizes['8'],
              paddingTop: space['0.5'],
            },
            '.react-datepicker__day-names': {
              display: 'none',
            },
            '.react-datepicker__day--selected': {
              backgroundColor: colors.brand['200'],
            },
            '.react-datepicker__day--disabled': {
              color: colors.gray['300'],
            },
            '.react-datepicker__day--keyboard-selected': {
              backgroundColor: colors.brand['200'],
            },
            input: {
              width: '100%',
            },
          }}
        >
          <ReactDatePicker
            calendarStartDay={1}
            shouldCloseOnSelect={true}
            selected={date}
            onChange={newDate => {
              if (!newDate) {
                return;
              }
              if (!date) {
                let utc: Date = newDate;
                if (!showTimeInput) {
                  // If time is not shown and date is not set, set the time to middle of the day
                  const dateTime = DateTime.fromJSDate(newDate);
                  utc = dateTime.set({hour: 12}).toJSDate();
                }
                onDateChanged?.(utc);
                return;
              }
              onDateChanged?.(newDate);
            }}
            showPopperArrow={showPopperArrow}
            autoComplete={'off'}
            dateFormat={showTimeInput ? 'dd-MM-yyyy HH:mm' : 'dd-MM-yyyy'}
            placeholderText={placeholder ?? 'dd-mm-jjjj'}
            timeInputLabel={`${'time'}:`}
            maxDate={maxDate}
            showTimeInput={showTimeInput}
            renderCustomHeader={props => <DatePickerHeader {...props} />}
            disabled={isDisabled}
            popperModifiers={[
              {
                name: 'offset',
                options: {
                  offset: [isSmallVariant ? -9 : -17, isSmallVariant ? -2 : 4],
                },
              },
              {
                name: 'preventOverflow',
                options: {
                  rootBoundary: 'viewport',
                  tether: false,
                  altAxis: true,
                },
              },
            ]}
          />
          {isClearable && date && (
            <TransparentIconButton
              onClick={() => {
                onDateChanged?.(undefined);
              }}
              label={'clearInput'}
              mr={'2'}
              icon={<CloseIcon />}
            />
          )}
          {showCalendarIcon && (
            <CalendarCheckedIcon boxSize={isSmallVariant ? '4' : '5'} />
          )}
        </Flex>

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
      </FormControl>
    );
  }
);

const DatePickerHeader = memo(
  ({
    date,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    return (
      <HorizontalSelectionButton
        px={'2'}
        pt={'2'}
        text={capitalizeFirstLetter(formatDate(date, DateFormat.MONTH_YEAR))}
        leftButton={{
          onClick: decreaseMonth,
          disabled: prevMonthButtonDisabled,
          ariaLabel: 'previousMonth',
        }}
        rightButton={{
          onClick: increaseMonth,
          disabled: nextMonthButtonDisabled,
          ariaLabel: 'nextMonth',
        }}
        startButton={{
          onClick: decreaseYear,
          disabled: prevYearButtonDisabled,
          ariaLabel: 'previousYear',
        }}
        endButton={{
          onClick: increaseYear,
          disabled: nextYearButtonDisabled,
          ariaLabel: 'nextYear',
        }}
      />
    );
  }
);
