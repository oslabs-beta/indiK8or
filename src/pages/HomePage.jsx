// import './App.css' 
import { Box } from '@mui/material'
// import { Routes,Route } from 'react-router-dom'

const HomePage = () => {

  return (
    <Box>
    <iframe src="http://localhost:3000/d-solo/af298a4d-15a0-498e-a5ef-3a927d18598d/node-exporter-nodes?orgId=1&refresh=30s&from=1685815355068&to=1685818955068&theme=dark&panelId=6" width="450" height="200" frameBorder="0"></iframe>
    <iframe src="http://localhost:3000/d-solo/af298a4d-15a0-498e-a5ef-3a927d18598d/node-exporter-nodes?orgId=1&refresh=30s&from=1685815386073&to=1685818986073&theme=dark&panelId=5" width="450" height="200" frameBorder="0"></iframe>
    <iframe src="http://localhost:3000/d-solo/af298a4d-15a0-498e-a5ef-3a927d18598d/node-exporter-nodes?orgId=1&refresh=30s&from=1685815449344&to=1685819049344&theme=dark&panelId=3" width="450" height="200" frameBorder="0"></iframe>
    <iframe src="http://localhost:3000/d-solo/af298a4d-15a0-498e-a5ef-3a927d18598d/node-exporter-nodes?orgId=1&refresh=5s&from=1685816089848&to=1685819689848&panelId=2" width="450" height="200" frameBorder="0"></iframe>
    </Box>
  )
}

export default HomePage;
