import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  verifyCompany,
  saveUserAndSendOTP,
  verifyOTP,
  resendOTP,
  getWellnessInterests,
  getWellbeingPillars,
  completeRegistration,
} from '../../api';

export const verifyCompanyThunk = createAsyncThunk(
  'registration/verifyCompany',
  async ({ company_name, password }, { rejectWithValue }) => {
    try {
      const res = await verifyCompany(company_name, password);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.data?.message || 'Verification failed');
    }
  }
);

export const saveUserThunk = createAsyncThunk(
  'registration/saveUser',
  async ({ company_id, mail, fname, lname }, { rejectWithValue }) => {
    try {
      const res = await saveUserAndSendOTP(company_id, mail, fname, lname);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.data?.message || 'Failed to send OTP');
    }
  }
);

export const verifyOTPThunk = createAsyncThunk(
  'registration/verifyOTP',
  async ({ otp, token }, { rejectWithValue }) => {
    try {
      const res = await verifyOTP(otp, token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.data?.message || 'OTP verification failed');
    }
  }
);

export const resendOTPThunk = createAsyncThunk(
  'registration/resendOTP',
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await resendOTP(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.data?.message || 'Failed to resend OTP');
    }
  }
);

export const fetchInterestsThunk = createAsyncThunk(
  'registration/fetchInterests',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getWellnessInterests();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load interests');
    }
  }
);

export const fetchPillarsThunk = createAsyncThunk(
  'registration/fetchPillars',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getWellbeingPillars();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load pillars');
    }
  }
);

export const completeRegistrationThunk = createAsyncThunk(
  'registration/complete',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await completeRegistration(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.data?.message || err.response?.data?.error || 'Registration failed');
    }
  }
);

const initialState = {
  companyId: null,
  companyName: '',
  email: '',
  firstName: '',
  lastName: '',
  token: '',
  password: '',
  birthday: '',
  phoneNumber: '',
  workAnniversary: '',
  acceptedPrivacyPolicy: false,
  areasOfInterest: [],
  wellbeingPillars: [],
  interestsList: [],
  pillarsList: [],
  loading: false,
  error: null,
  userData: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    toggleInterest: (state, action) => {
      const id = action.payload;
      const idx = state.areasOfInterest.indexOf(id);
      if (idx >= 0) {
        state.areasOfInterest.splice(idx, 1);
      } else {
        state.areasOfInterest.push(id);
      }
    },
    togglePillar: (state, action) => {
      const id = action.payload;
      const idx = state.wellbeingPillars.indexOf(id);
      if (idx >= 0) {
        state.wellbeingPillars.splice(idx, 1);
      } else if (state.wellbeingPillars.length < 3) {
        state.wellbeingPillars.push(id);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetRegistration: () => initialState,
  },
  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(verifyCompanyThunk.pending, pending)
      .addCase(verifyCompanyThunk.fulfilled, (state, action) => {
        state.loading = false;
        const company = action.payload?.data?.[0];
        if (company) {
          state.companyId = company.id;
          state.companyName = company.company_name;
        }
      })
      .addCase(verifyCompanyThunk.rejected, rejected)

      .addCase(saveUserThunk.pending, pending)
      .addCase(saveUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.data?.token || '';
      })
      .addCase(saveUserThunk.rejected, rejected)

      .addCase(verifyOTPThunk.pending, pending)
      .addCase(verifyOTPThunk.fulfilled, (state) => { state.loading = false; })
      .addCase(verifyOTPThunk.rejected, rejected)

      .addCase(resendOTPThunk.pending, pending)
      .addCase(resendOTPThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.data?.token || state.token;
      })
      .addCase(resendOTPThunk.rejected, rejected)

      .addCase(fetchInterestsThunk.pending, pending)
      .addCase(fetchInterestsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.interestsList = (action.payload?.data || []).flat();
      })
      .addCase(fetchInterestsThunk.rejected, rejected)

      .addCase(fetchPillarsThunk.pending, pending)
      .addCase(fetchPillarsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.pillarsList = action.payload?.data || [];
      })
      .addCase(fetchPillarsThunk.rejected, rejected)

      .addCase(completeRegistrationThunk.pending, pending)
      .addCase(completeRegistrationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload?.data;
      })
      .addCase(completeRegistrationThunk.rejected, rejected);
  },
});

export const { setField, toggleInterest, togglePillar, clearError, resetRegistration } =
  registrationSlice.actions;
export default registrationSlice.reducer;
