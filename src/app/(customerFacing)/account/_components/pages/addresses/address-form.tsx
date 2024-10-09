import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import SelectInput from "@/components/ui/select-input";
import SubmitButton from "@/components/ui/submit-button";
import React, { useEffect, useState } from "react";

type AddressFormProps = {
  name: string;
  closeForm: () => void;
};

type CountryOption = {
  label: string;
  value: string; // Use alpha2Code or another identifier if needed
};

export default function AddressForm({ name, closeForm }: AddressFormProps) {
  const [addressCountries, setAddressCountries] = useState<CountryOption[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        // Map the data to the format required for the SelectInput
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countries = data.map((country: any) => ({
          label: country.name.common, // Display name
          value: country.alpha2Code, // Country code
        }));
        setAddressCountries(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <form id={name} name={name}>
      <div className="flex items-center gap-10">
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name *"
          className="text-h5-desktop text-dark-gray"
          formControllClassName="mb-8 flex-1"
        />
        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name *"
          className="text-h5-desktop text-dark-gray"
          formControllClassName="mb-8 flex-1"
        />
      </div>
      <Input
        type="text"
        name="companyName"
        id="companyName"
        placeholder="Company Name *"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-8"
      />
      <SelectInput
        id="country"
        options={addressCountries}
        className="mb-8"
        // Optional: value={selectedCountry} // If you have a state for selected country
        // Optional: onChange={handleCountryChange} // If you need to handle changes
      />
      <Input
        type="text"
        name="postCode"
        id="postCode"
        placeholder="Postcode / ZIP *"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-8"
      />
      <Input
        type="text"
        name="town"
        id="town"
        placeholder="Town / City *"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-8"
      />
      <Input
        type="text"
        name="phone"
        id="phone"
        placeholder="Phone *"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-8"
      />
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email *"
        className="text-h5-desktop text-dark-gray"
      />
      <div className="mt-16 flex items-center gap-8">
        <SubmitButton className="flex-1 text-body-large uppercase">
          Save Address
        </SubmitButton>
        <Button
          type="reset"
          variant="outlined"
          className="flex-1 text-body-large uppercase"
          onClick={() => closeForm()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
