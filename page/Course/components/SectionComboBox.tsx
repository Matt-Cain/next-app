import { InputBase, Combobox, useCombobox } from '@mantine/core';

enum SECTIONS {
  bakery = 'bakery',
  cheese_and_dips = 'cheese_and_dips',
  chips_and_bread = 'chips_and_bread',
  dairy = 'dairy',
  drinks = 'drinks',
  frozen = 'frozen',
  home = 'home',
  meat = 'meat',
  pantry = 'pantry',
  produce = 'produce',
}

export enum SECTION_LABELS {
  bakery = 'Bakery',
  cheese_and_dips = 'Cheese & dips',
  chips_and_bread = 'Chips & Bread',
  dairy = 'Dairy',
  drinks = 'Drinks',
  frozen = 'Frozen',
  home = 'Home',
  meat = 'Meat',
  pantry = 'Pantry',
  produce = 'Produce',
}

const sectionEntries = Object.entries(SECTION_LABELS).toReversed();

export const SectionComboBox = ({
  error,
  onChange,
  value,
}: {
  error?: string;
  onChange: (value: string) => void;
  value?: keyof typeof SECTIONS;
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = sectionEntries.map(([key, label]) => (
    <Combobox.Option value={key} key={key}>
      {label}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        onChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          error={error}
          mt={15}
          label="Section"
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value && SECTION_LABELS[value]}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
