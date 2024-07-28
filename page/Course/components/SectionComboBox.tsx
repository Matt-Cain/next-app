import { InputBase, Combobox, useCombobox } from '@mantine/core';

const SECTIONS = {
  bakery: 'Bakery',
  dairy: 'Dairy',
  drinks: 'Drinks',
  frozen: 'Frozen',
  home: 'Home',
  meat: 'Meat',
  pantry: 'Pantry',
  produce: 'Produce',
  other: 'Other',
};

const sectionEntries = Object.entries(SECTIONS);

export const SectionComboBox = ({
  onChange,
  value,
}: {
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
          mt={15}
          label="Section"
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value && SECTIONS[value]}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
