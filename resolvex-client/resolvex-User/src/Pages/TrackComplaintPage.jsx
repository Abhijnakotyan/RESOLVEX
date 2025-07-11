import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../Component/Navbar";

import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Chip,
} from '@mui/material';

import {
  AssignmentTurnedIn as AssignmentIcon,
  Event as EventIcon,
  Apartment as DepartmentIcon
} from '@mui/icons-material';

function TrackComplaint() {
  const [token, setToken] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:8000/api/complaints/track/${token}`);
      if (res.data?.length > 0) {
        setResults(res.data);
      } else {
        setError("No complaint found for this token.");
      }
    } catch (err) {
      console.error(err);
      setError("Not found or invalid token.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusChipStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return { backgroundColor: '#fb923c', color: 'white' };
      case 'in progress': return { backgroundColor: '#3b82f6', color: 'white' };
      case 'resolved': return { backgroundColor: '#22c55e', color: 'white' };
      case 'rejected': return { backgroundColor: '#ef4444', color: 'white' };
      default: return {};
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" className="mt-14 mb-12">
        <Card elevation={5} className="rounded-2xl shadow-xl">
          <CardContent className="p-8">
            <Box textAlign="center" className="mb-6">
              <Typography variant="h4" className="font-bold text-gray-800 tracking-wide">
                🎯 Track Complaint
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mt-2">
                Enter your 4-digit tracking token to get status updates.
              </Typography>
            </Box>

            <form onSubmit={handleTrack} className="space-y-4">
              <TextField
                label="Tracking Token"
                variant="outlined"
                fullWidth
                required
                inputProps={{ maxLength: 4, pattern: "\\d{4}" }}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#57c299',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#57c299',
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{
                  backgroundColor: '#57c299',
                  '&:hover': { backgroundColor: '#45b58c' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                {loading ? 'Tracking...' : 'Track Complaint'}
              </Button>
            </form>

            {error && <Alert severity="error" className="mt-6">{error}</Alert>}

            {results.length > 0 && (
              <Box className="mt-8 space-y-6">
                {results.map((complaint, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    className="rounded-xl bg-white shadow-md border border-gray-200"
                  >
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" className="text-gray-800 font-semibold flex items-center gap-2">
                          <AssignmentIcon color="primary" fontSize="small" />
                          {complaint.subject}
                        </Typography>
                        <Chip
                          label={complaint.status}
                          size="small"
                          sx={getStatusChipStyle(complaint.status)}
                        />
                      </Box>

                      <Box className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <DepartmentIcon fontSize="small" />
                        <span className="font-medium">Department:</span> {complaint.department_name || "Unknown"}
                      </Box>

                      <Box className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <EventIcon fontSize="small" />
                        <span className="font-medium">Submitted:</span>{' '}
                        {new Date(complaint.created_at).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default TrackComplaint;
