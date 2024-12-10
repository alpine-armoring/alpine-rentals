import React, { useState, useEffect } from 'react';
import styles from './Form.module.scss';
import Button from 'components/global/button/Button';
import Dropdown from 'components/global/form/Dropdown';
import { useRouter } from 'next/router';

// import { sendEmail } from 'hooks/aws-ses';

const Form = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [company, setCompany] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [hear, setHear] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [preferredContact, setPreferredContact] = useState('');
  const [message, setMessage] = useState('');

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes('rental-vehicles')) {
      setInquiry('Rental Vehicles');
    }
  }, [router.asPath]);

  useEffect(() => {
    if (router.query.source === 'become-a-dealer') {
      setInquiry('Become a Dealer');
    }
  }, [router.query.source]);

  const [isCompanyDropdownActive, setIsCompanyDropdownActive] = useState(false);
  const [isCountryDropdownActive, setIsCountryDropdownActive] = useState(false);
  const [isStateDropdownActive, setIsStateDropdownActive] = useState(false);
  const [isVehicleTypeDropdownActive, setIsVehicleTypeDropdownActive] =
    useState(false);
  const [isVehicleModelDropdownActive, setIsVehicleModelDropdownActive] =
    useState(false);

  const countryOptions = [
    'United States',
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo, Democratic Republic of',
    'Congo, Republic of',
    'Costa Rica',
    "Côte d'Ivoire",
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  const stateOptions = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  const [errors, setErrors] = useState<Record<string, string>>({});

  function sanitizeInput(input) {
    return input.replace(/[&<>"'/\w\s]/g, function (char) {
      switch (char) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        case '/':
          return '&#x2F;';
        default:
          return char;
      }
    });
  }

  const validateFullname = (value) => {
    const fullNamePattern = /^[A-Z ]{3,}$/i;
    if (!value) {
      return 'Name is required';
    } else if (!fullNamePattern.test(value)) {
      return 'Please provide a valid name';
    } else {
      return '';
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!value) {
      return 'Email is required.';
    } else if (!emailPattern.test(value)) {
      return 'Invalid email address';
    } else {
      return '';
    }
  };

  const validatePhone = (value) => {
    const phonePattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/;
    if (value && !phonePattern.test(value)) {
      return 'Please enter a valid phone number';
    } else {
      return '';
    }
  };

  const validateMobile = (value) => {
    const mobilePattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/;
    if (!value) {
      return 'Mobile Number is required';
    } else if (!mobilePattern.test(value)) {
      return 'Please enter a valid mobile number';
    } else {
      return '';
    }
  };

  const validateCountry = (value) => {
    if (!value) {
      return 'Country is required';
    } else {
      return '';
    }
  };

  const validateState = (value) => {
    if (country === 'United States' && !value) {
      return 'State is required';
    } else {
      return '';
    }
  };

  const validateDates = () => {
    if (!fromDate) {
      return 'From Date is required';
    }
    if (!toDate) {
      return 'To Date is required';
    }
    if (new Date(fromDate) > new Date(toDate)) {
      return 'From Date must be before or equal to To Date';
    }
    return '';
  };

  const handleFieldChange = (field, value, validator, setter) => {
    setter(value);
    const errorMessage = validator(value);
    setErrors({ ...errors, [field]: errorMessage });
  };

  // const parseJSON = (resp) => (resp.json ? resp.json() : resp);

  // const checkStatus = (resp) => {
  //   if (resp.status >= 200 && resp.status < 300) {
  //     return resp;
  //   }
  //   return parseJSON(resp).then((resp) => {
  //     throw resp;
  //   });
  // };

  const headers = {
    'Content-Type': 'application/json',
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    const newErrors = {
      fullname: validateFullname(fullname),
      email: validateEmail(email),
      phone: validatePhone(phone),
      mobile: validateMobile(mobile),
      country: validateCountry(country),
      state: validateState(state), // Validate state if the country is United States
      dates: validateDates(),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== '');

    if (!hasError) {
      const sanitizedMessage = sanitizeInput(message);

      const submitBtn = document.querySelector('.submitButton');
      submitBtn.classList.add('submiting');
      submitBtn.innerHTML = '';

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/emails`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              data: {
                name: fullname,
                email: email,
                mobileNumber: mobile,
                phoneNumber: phone,
                company: company,
                inquiry: inquiry,
                preferredContact: preferredContact,
                hear: hear,
                country: country,
                state: country === 'United States' ? state : '',
                message: sanitizedMessage,
                route: router.asPath,
                date: Date.now(),
                fromDate: fromDate,
                toDate: toDate,
                vehicleType: vehicleType,
                vehicleModel: vehicleModel,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        // Handle success
        submitBtn.classList.remove('submiting');
        submitBtn.innerHTML = 'Sent!';
        submitBtn.classList.add('submitted');

        // Reset form fields
        setFullname('');
        setEmail('');
        setPhone('');
        setMobile('');
        setCompany('');
        setInquiry('');
        setHear('');
        setCountry('');
        setState('');
        setPreferredContact('');
        setMessage('');
        setFromDate('');
        setToDate('');
        setVehicleType('');
        setVehicleModel('');

        // Show success message to user
      } catch (error) {
        // console.error('Error:', error);
        // Handle error
        submitBtn.classList.remove('submiting');
        submitBtn.innerHTML = 'Error';
        submitBtn.classList.add('error');

        // Show error message to user
      }

      setTimeout(() => {
        submitBtn.innerHTML = 'Send message';
        submitBtn.classList.remove('submitted', 'error');
      }, 2000);
    }
  };

  return (
    <div className={`${styles.form}`}>
      <div
        className={`${styles.form_group} ${
          errors.fullname ? styles.error : ''
        }`}
      >
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) =>
            handleFieldChange(
              'fullname',
              e.target.value,
              validateFullname,
              setFullname
            )
          }
          placeholder="Full Name*"
          // required
          className={`${styles.form_input}`}
        />
        <small className={`${styles.form_input_error}`}>
          {errors.fullname}
        </small>
      </div>

      <div
        className={`${styles.form_group} ${errors.email ? styles.error : ''}`}
      >
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) =>
            handleFieldChange('email', e.target.value, validateEmail, setEmail)
          }
          placeholder="Email*"
          className={`${styles.form_input}`}
          // required
        />
        <small className={`${styles.form_input_error}`}>{errors.email}</small>
      </div>

      <div
        className={`${styles.form_group} ${errors.mobile ? styles.error : ''}`}
      >
        <input
          type="tel"
          id="mobile"
          value={mobile}
          onChange={(e) =>
            handleFieldChange(
              'mobile',
              e.target.value,
              validateMobile,
              setMobile
            )
          }
          placeholder="Mobile Number*"
          className={`${styles.form_input}`}
          // required
        />
        <small className={`${styles.form_input_error}`}>{errors.mobile}</small>
      </div>

      <div
        className={`${styles.form_group} ${errors.phone ? styles.error : ''}`}
      >
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) =>
            handleFieldChange('phone', e.target.value, validatePhone, setPhone)
          }
          placeholder="Alternate Phone Number"
          className={`${styles.form_input}`}
        />
        <small className={`${styles.form_input_error}`}>{errors.phone}</small>
      </div>

      <div
        className={`${styles.form_group} ${errors.company ? styles.error : ''}`}
      >
        <Dropdown
          label="Customer Type"
          options={[
            'Embassy/Consulate',
            'Private',
            'Broker',
            'Limo Company',
            'Security Firm',
          ]}
          selectedOption={company}
          setSelectedOption={setCompany}
          isActive={isCompanyDropdownActive}
          setIsActive={setIsCompanyDropdownActive}
        />
        <small className={`${styles.form_input_error}`}>{errors.company}</small>
      </div>

      <div
        className={`${styles.form_group} ${errors.company ? styles.error : ''}`}
      >
        <input
          type="number"
          id="mileage"
          value={phone}
          onChange={(e) =>
            handleFieldChange(
              'mileage',
              e.target.value,
              validatePhone,
              setPhone
            )
          }
          placeholder="Expected Mileage"
          className={`${styles.form_input}`}
        />
        <small className={`${styles.form_input_error}`}>{errors.mileage}</small>
      </div>

      <div
        className={`${styles.form_group} ${errors.country ? styles.error : ''}`}
      >
        <Dropdown
          label="Rental Location City*"
          options={countryOptions}
          selectedOption={country}
          setSelectedOption={(value) => {
            setCountry(value);
            setState(''); // Reset state if country changes
          }}
          isActive={isCountryDropdownActive}
          setIsActive={setIsCountryDropdownActive}
        />
        <small className={`${styles.form_input_error}`}>{errors.country}</small>
      </div>

      <div
        className={`${styles.form_group} ${errors.state ? styles.error : ''} ${
          country !== 'United States' ? styles.disabled : ''
        }`}
      >
        <Dropdown
          label="Rental Location State*"
          options={stateOptions}
          selectedOption={state}
          setSelectedOption={setState}
          isActive={country === 'United States' ? isStateDropdownActive : false}
          setIsActive={setIsStateDropdownActive}
        />
        <small className={styles.form_input_error}>{errors.state}</small>
      </div>

      <div
        className={`${styles.form_group} ${errors.company ? styles.error : ''}`}
      >
        <input
          type="number"
          id="mileage"
          value={phone}
          onChange={(e) =>
            handleFieldChange(
              'mileage',
              e.target.value,
              validatePhone,
              setPhone
            )
          }
          placeholder="Insurance"
          className={`${styles.form_input}`}
        />
        <small className={`${styles.form_input_error}`}>{errors.mileage}</small>
      </div>

      <fieldset className={`${styles.form_group} ${styles.form_group_radio}`}>
        <legend>Driver Needed (Y/N)</legend>

        <div className={`${styles.form_group_radio_wrap}`}>
          <input
            type="radio"
            id="driverYes"
            name="driverNeeded"
            value="driverYes"
          />
          <label htmlFor="driverYes">Yes</label>

          <input
            type="radio"
            id="driverNo"
            name="driverNeeded"
            value="driverNo"
          />
          <label htmlFor="driverNo">No</label>
        </div>
      </fieldset>

      <fieldset
        className={`${styles.form_group_date} ${styles.form_group_full} ${styles.form_group}`}
      >
        <div className={`${styles.form_date_wrapper}`}>
          <div className={`${styles.form_group_date_from}`}>
            <label htmlFor="fromDate">From Date*</label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              className={`${styles.form_input}`}
            />
          </div>
          <div className={`${styles.form_group_date_to}`}>
            <label htmlFor="toDate">To Date*</label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              className={`${styles.form_input}`}
            />
          </div>
        </div>

        <small className={`${styles.form_input_error}`}>{errors.dates}</small>
      </fieldset>

      <div
        className={`${styles.form_group} ${errors.vehicleType ? styles.error : ''}`}
      >
        <Dropdown
          label="Vehicle Type"
          options={['SUVs', 'Sedans']}
          selectedOption={vehicleType}
          setSelectedOption={setVehicleType}
          isActive={isVehicleTypeDropdownActive}
          setIsActive={setIsVehicleTypeDropdownActive}
        />
        <small className={`${styles.form_input_error}`}>
          {errors.vehicleType}
        </small>
      </div>

      <div
        className={`${styles.form_group} ${errors.vehicleModel ? styles.error : ''}`}
      >
        <Dropdown
          label="Vehicle Specific Make & Model"
          options={['SUVs', 'Sedans']}
          selectedOption={vehicleModel}
          setSelectedOption={setVehicleModel}
          isActive={isVehicleModelDropdownActive}
          setIsActive={setIsVehicleModelDropdownActive}
        />
        <small className={`${styles.form_input_error}`}>
          {errors.vehicleModel}
        </small>
      </div>

      <div
        className={`${styles.form_group} ${styles.form_group_full} ${
          errors.message ? styles.error : ''
        }`}
      >
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={7}
          placeholder="Message"
          className={`${styles.form_input} ${styles.form_textarea}`}
        />
        <small className={`${styles.form_input_error}`}>{errors.message}</small>
      </div>

      <div className={`${styles.form_submit} center`}>
        <Button
          button={true}
          onClick={handleSubmit}
          className={`${styles.form_submit_button} submitButton primary rounded`}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default Form;
