import React, { useState, useEffect} from 'react'
import { Link } from'react-router-dom'
import { Select, MenuItem, Button ,Grid,InputLabel, Typography} from '@material-ui/core'
import { useForm, FormProvider} from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../../lib/commerce'
const AddressForm = ({ checkoutToken, next}) => {
    const methods = useForm()
    
  
    const[countries, setCountries] = useState([]);
    const[country, setCountry] = useState('');
    const[subDivisions, setSubDivisions] = useState([]);
    const[subDivision, setSubDivision] = useState('');
    const[options, setOptions] = useState([]);
    const[option, setOption] = useState('');
   
    // To Conevert array of array into simple array
    const countriesArray = Object.entries(countries).map(([code,name]) =>({id:code, label:name}));
    console.log(countriesArray)

    const subdivionsArray = Object.entries(subDivisions).map(([code,name]) =>({id:code, label:name}));
    console.log(subdivionsArray)
    
    const optionsArray = options.map((so) =>({id:so.id, label:`${so.description}- (${so.price.formatted_with_price})`}))
    const fetchCountries = async(checkoutTokenId) =>{
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries)
        setCountries(countries);
        setCountry(Object.keys(countries)[0])
    }
    const fetchSubDivisions = async(countryCode) =>{
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        console.log(subdivisions)
        setSubDivisions(subdivisions)
        setSubDivision(Object.keys(subdivisions)[0])
    }
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
    
        setOptions(options);
        setOption(options[0].id);
      };
    useEffect(() =>{
           fetchCountries(checkoutToken.id)
    },[])

    useEffect(() =>{
       if(country) fetchSubDivisions(country);
    },[country])
    useEffect(() => {
        if (subDivision) fetchShippingOptions(checkoutToken.id, country, subDivision);
      }, [subDivision]);
     
    return (
        <>
          <Typography variant="h6" gutterBottom>Shiiping Address</Typography>
            <FormProvider { ...methods}>
             <form onSubmit={methods.handleSubmit((data) => next({ ...data, country, subDivision, option}))}>
                 <Grid container spacing={3}>
                     <FormInput  name='firstname' label='First Name'/>
                     <FormInput  name='lastname' label='last Name'/>
                     <FormInput  name='address1' label='Address'/>
                     <FormInput  name='email' label='email'/>
                     <FormInput  name='city' label='city'/>
                     <FormInput  name='postalcode' label='Postal code'/>
                  
                     <Grid item xs={12} sm={6}>
                         <InputLabel>Shipping Country</InputLabel>
                         <Select fullWidth value={country} onChange={(e) =>setCountry(e.target.value)}>
                            {countriesArray.map((country) =>(
                                 <MenuItem key={country.id} value={country.id}>
                                      {country.label}
                                </MenuItem> 
                            ))}
                          </Select>
                        </Grid>
                          <Grid item xs={12} sm={6}>
                          <InputLabel>Shipping SubDivisions</InputLabel>
                         <Select fullWidth value={subDivision} onChange={(e) => setSubDivision(e.target.value)}>
                         {
                             subdivionsArray.map((subdivision) =>(
                                 <MenuItem key={subdivision.id} value={subdivision.id}>
                                     {subdivision.label}
                             </MenuItem>
                             ))
                         }
                            
                         </Select>
                         </Grid>
                         <Grid item xs={12} sm={6}>
                         <InputLabel>Shipping Options</InputLabel>
                         <Select fullWidth value={option} onChange={(e) => setOption(e.target.value)}>
                            {optionsArray.map((option) =>(
                                <MenuItem key={option.id} value={option.id}>
                                  {option.label}
                            </MenuItem>
                            ) )} 
                         </Select> 
                        
                     </Grid>
                 </Grid>
                 <br/>
                 <div style={{display:'flex', justifyContent:'space-between'}}>
                         <Button type="button" component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                         <Button type="submit"  variant="outlined" color="primary">Next Step</Button>
                 </div>
             </form>

         </FormProvider>
            
      </>
    )
}

export default AddressForm
