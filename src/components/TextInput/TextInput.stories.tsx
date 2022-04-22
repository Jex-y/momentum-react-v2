import React, { useState, FC, useRef } from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';

import TextInput, { TextInputProps } from './';

const messageArrOptions = {
  empty: [],
  error: [{ message: 'Error message', level: 'error' }],
  success: [{ message: 'Success message', level: 'success' }],
  warning: [{ message: 'Warning message', level: 'warning' }],
};

export default {
  title: 'Momentum UI/TextInput',
  component: TextInput,
  args: {
    label: 'Label',
    description: 'Description text for this input',
    initialValue: 'some input',
    placeholder: 'Input placeholder',
  },
  argTypes: {
    messageArr: {
      description: 'The list of messages to be passed in',
      options: Object.keys(messageArrOptions),
      mapping: messageArrOptions,
      control: { type: 'select' },
    },
    description: {
      description: 'The description text for the input',
      control: { type: 'text' },
    },
    isDisabled: {
      description: 'Whether the input is disabled or not',
      control: { type: 'boolean' },
    },
    label: {
      description: 'The label for the input',
      control: { type: 'text' },
    },
    className: {
      description:
        'If present, the class name will be added to the underlying component. Used to override styles by consumers.',
      control: { type: 'text' },
    },
    clearAriaLabel: {
      description: 'Aria label for the clear button',
      control: { type: 'text' },
    },
    inputClassName: {
      description:
        'If present, the class name will be added to the underlying input. Used to override styles by consumers.',
      control: { type: 'text' },
    },
  },
};

interface StoryProps extends TextInputProps {
  initialValue: string;
}

const PaddedExample: FC<TextInputProps> = (props: TextInputProps) => {
  return (
    <div style={{ margin: '1rem' }}>
      <TextInput style={{ width: '20rem' }} {...props} />
    </div>
  );
};

const BetterExample: FC<StoryProps> = (props: StoryProps) => {
  const mutatedProps = { ...props };
  delete mutatedProps.initialValue;

  const [value, setValue] = useState(props.initialValue);

  const ref = useRef<HTMLInputElement>();
  const onChange = (e) => {
    setValue(e);
    if (ref.current) {
      // eslint-disable-next-line no-console
      console.log(ref.current.value);
    }
  };

  return <TextInput {...mutatedProps} value={value} ref={ref} onChange={onChange} />;
};

const Example = Template<StoryProps>(BetterExample).bind({});

Example.args = {};

const Common = MultiTemplate<TextInputProps>(PaddedExample).bind({});
Common.args = {};
Common.parameters = {
  variants: [
    {
      value: 'test',
      label: 'Label',
      description: 'This is help text for the input.',
    },
    {
      label: 'Label',
      value: 'test',
      isDisabled: true,
      description: 'This is help text for the input.',
    },
    {
      label: 'Label',
      value: 'test',
      description: 'This is help text for the input.',
      messageArr: [{ level: 'error', message: 'Error message' }],
    },
  ],
};

export { Example, Common };
