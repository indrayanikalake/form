import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { setPersonalDetails, submitUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import 'datatables.net';


interface Step1FormProps {
  onSubmit: SubmitHandler<any>;
}

const Step1Form: React.FC<Step1FormProps> = ({ onSubmit }) => {
 const { personalDetails, submittedUsers } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onNext = (data: any) => {
    dispatch(setPersonalDetails(data));
    dispatch(submitUser());
    navigate('/step2')
  };

  

   useEffect(() => {
    
    $('#example').DataTable();
    }, [submittedUsers]);

  return (
    <div >
    <form className='form ' onSubmit={handleSubmit(onNext)}>
      <Typography variant="h5">Personal Details</Typography>
      
       <Paper elevation={3}>
         <div />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message} fullWidth />
        )}
      />

      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Age"
            type="number"
            error={!!errors.age}
            helperText={errors.age?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="sex"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Sex</InputLabel>
            <Select {...field}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="mobile"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Mobile"
            error={!!errors.mobile}
           helperText={errors.mobile?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="govIdType"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Govt Issued ID Type</InputLabel>
            <Select {...field}>
              <MenuItem value="Aadhar">Aadhar</MenuItem>
              <MenuItem value="PAN">PAN</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="govId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Govt Issued ID"
            error={!!errors.govId}
            helperText={errors.govId?.message}
            fullWidth
          />
        )}
      />

   
       <Button fullWidth type="submit" variant="contained" color="primary" >
        Next
      </Button>
    
      <div />
      </Paper>
     
     
    </form>
   

     <table id="example" className="table display">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Mobile</th>
              <th>Gov ID Type</th>
              <th>Gov ID</th>
            
            </tr>
          </thead>
          <tbody className='border_bottom'>
            {submittedUsers?.map((user: any, index: number) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.sex}</td>
                <td>{user.mobile}</td>
                <td>{user.govIdType}</td>
                <td>{user.govId}</td>
               
              </tr>
            ))}
          </tbody>
        </table>

       
      </div>
  );
};


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number'),
  sex: Yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
  mobile: Yup.string().matches(/^\d{10}$/, 'Invalid Indian Mobile Number').required('Mobile is required'),
  govIdType: Yup.string().oneOf(['Aadhar', 'PAN'], 'Invalid Govt Issued ID Type').required('Govt Issued ID Type is required'),
  govId: Yup.string().test({
  name: 'govId',
  message: 'Invalid Govt Issued ID',
  test: function (value) {
    const govIdType = this.parent?.govIdType;
    if (govIdType === 'Aadhar') {
      return typeof value === 'string' && /^[2-9]\d{11}$/.test(value);
    } else if (govIdType === 'PAN') {
      return typeof value === 'string' && /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value);
    }
    return false;
  },
}).required('Govt Issued ID is required') as Yup.StringSchema<string>,

});




export default Step1Form;
