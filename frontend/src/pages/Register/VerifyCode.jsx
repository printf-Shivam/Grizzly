import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { verifyAPI } from '../../api/authentication';

const VerifyCode = ({email}) => {

    const [values,setValues]= useState({
        userName:email,
        code:''
    });

    const [error,setError] =useState('');
    const dispatch = useDispatch();
    const [message,setMessage] = useState('');

    const onSubmit= useCallback((e)=>{
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));


    verifyAPI(values).then(res=>{
      setMessage('Your email has been successfully verified. You can now log in to your account.')
    }).catch(err=>{
      setError('Incorrect or Expired Verification Code.');
    }).finally(()=>{
      dispatch(setLoading(false));
    })

    },[dispatch, values]);

    const handleOnChange = useCallback((e)=>{
    e.persist();
    setValues(values=>({
      ...values,
      [e.target.name]:e.target?.value,
    }))
    },[]);

    
    return (
        <div className="min-h-[320px] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-md p-6">
            {!message ? (
              <>
                <div className="mb-4">
                  <h1 className="text-xl font-semibold text-slate-800">Registration successful</h1>
                  <p className="mt-2 text-sm text-slate-600">
                    We've sent a 6-digit verification code to <span className="font-medium text-slate-800">{email}</span>.
                    Please enter it below to verify your account.
                  </p>
                </div>
    
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <label htmlFor="code" className="sr-only">6 digit verification code</label>
                  <input
                    id="code"
                    type="text"
                    name="code"
                    value={values?.code}
                    maxLength={6}
                    onChange={handleOnChange}
                    placeholder="Enter 6-digit code"
                    className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 text-lg tracking-widest placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    required
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    aria-label="6 digit verification code"
                  />
    
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="flex-0 px-5 py-2.5 rounded-lg bg-slate-900 text-white font-medium shadow-sm hover:bg-slate-800 active:scale-[0.995] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Verify
                    </button>
    
                    <button
                      type="button"
                      onClick={() => {
                        // keep behaviour minimal: clear code input (UI-only, no extra features)
                        setValues(v => ({ ...v, code: '' }));
                        setError('');
                      }}
                      className="text-sm text-slate-500 underline-offset-2 hover:text-slate-700"
                    >
                      Edit email
                    </button>
                  </div>
                </form>
    
                {error && (
                  <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3">
                    {error}
                  </p>
                )}
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-lg font-semibold text-emerald-700">Verified</h2>
                <p className="mt-2 text-sm text-slate-600">{message}</p>
              </div>
            )}
          </div>
        </div>
      )
}

export default VerifyCode
