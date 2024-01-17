// Step2Form.tsx
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalDetails, submitUser } from '../redux/userAdditionalDetailsSlice';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import 'datatables.net';



const step2ValidationSchema = Yup.object().shape({
  address: Yup.string().optional(),
  state: Yup.string().optional(),
  city: Yup.string().optional(),
  country: Yup.string().required('Country is required'),
  pincode: Yup.number().optional().positive('Pincode must be a positive number'),
});

const Step2Form: React.FC<{ onSubmit: SubmitHandler<any> }> = ({ onSubmit }) => {
    const {  submittedUsers } = useSelector((state: any) => state.userAdditionalDetails);
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(step2ValidationSchema),
  });

  const [countries, setCountries] = useState<string[]>([]);

 
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
      
        console.log(response)
        setCountries(response.data.map((country: any) => country.name.common));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const onNext = (data: any) => {
    dispatch(setPersonalDetails(data));
      dispatch(submitUser());
  };

   useEffect(() => {
    console.log(submittedUsers);
    $('#example1').DataTable();
    }, [submittedUsers]);

  return (
    <div >
    <form className='form' onSubmit={handleSubmit(onNext)}>
         <Typography variant="h5" >Step 2: Additional Details</Typography>
       
      <Paper elevation={3}>
     
        <div />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Address" error={!!errors.address} helperText={errors.address?.message} fullWidth />
        )}
      />

      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="State" error={!!errors.state} helperText={errors.state?.message} fullWidth />
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="City" error={!!errors.city} helperText={errors.city?.message} fullWidth />
        )}
      />

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select {...field}>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
            <p>{errors.country?.message}</p>
          </FormControl>
        )}
      />

      <Controller
        name="pincode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Pincode"
            type="number"
            error={!!errors.pincode}
            helperText={errors.pincode?.message}
            fullWidth
          />
        )}
      />

      <Button fullWidth type="submit" variant="contained" color="primary" >
        Submit
      </Button>
      <div />
      </Paper>
    </form>
    

     <table id="example1" className="table display">
          <thead>
            <tr>
              <th>Address</th>
              <th>State</th>
              <th>City</th>
              <th>Country</th>
              <th>Pincode</th>
            
            </tr>
          </thead>
          <tbody>
            {submittedUsers?.map((user: any, index: number) => (
              <tr key={index}>
                <td>{user.address}</td>
                <td>{user.state}</td>
                <td>{user.city}</td>
                <td>{user.country}</td>
                <td>{user.pincode}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  );
};

export default Step2Form;
