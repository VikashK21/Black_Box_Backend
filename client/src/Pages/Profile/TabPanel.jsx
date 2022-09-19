import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  useEffect(() => {
    // console.log('TabPanel useEffect');
    
    }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}
      className="d-flex justify-content-between"
      >
        <h1 className="gl textgrey">My Classes</h1>

        <div className="d-flex">
             <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
        style={{
          display: 'flex',
          justifyContent: 'end',
        }}
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          
        </Tabs>
        {/* <button>X</button> */}
        <p>X</p>
        </div>

       
      </Box>
      <TabPanel value={value} index={0}>
        
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      
    </Box>
  );
}