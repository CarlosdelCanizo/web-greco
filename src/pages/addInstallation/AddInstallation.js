import React, { useState } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';

import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ThirdForm from './ThirdForm';
import FourthForm from './FourthForm';
import FifthForm from './FifthForm';
import SixthForm from './SixthForm';
import FinishedPanel from './FinishedPanel';

const AddInstallation = props => {
  const initialFormState = {
    electrical_capacity: 0,
    surface: 0,
    lat: '',
    lon: '',
    orientation: '',
    inclination: '',
    panelTrackingOrientation: false,
    panelTrackingInclination: false,
    technologyUsed: '',
    inverterCapacity: 0,
    commissioningDate: null,
    observation: '',
    battery: true,
    batteryDescription: '',
    installationName: '',
    installationProperty: '',
    multimedia: []
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState(initialFormState);

  const handleChangeForm = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  console.log('step', currentStep);
  switch (currentStep) {
    case 1: {
      return (
        <FirstForm
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formState={formState}
          handleChangeForm={handleChangeForm}
          {...props}
        />
      );
    }
    case 2: {
      return (
        <SecondForm
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formState={formState}
          handleChangeForm={handleChangeForm}
          {...props}
        />
      );
    }
    case 3: {
      return (
        <ThirdForm
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formState={formState}
          handleChangeForm={handleChangeForm}
          {...props}
        />
      );
    }
    case 4: {
      return (
        <FourthForm
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formState={formState}
          handleChangeForm={handleChangeForm}
          {...props}
        />
      );
    }
    case 5: {
      return (
        <FifthForm
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formState={formState}
          handleChangeForm={handleChangeForm}
          {...props}
        />
      );
    }
    case 6: {
      return (
        <SixthForm
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formState={formState}
          handleChangeForm={handleChangeForm}
          {...props}
        />
      );
    }
    case 7: {
      return (
        <FinishedPanel
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formState={formState}
          handleChangeForm={handleChangeForm}
          {...props}
        />
      );
    }
  }
};

export default AddInstallation;
