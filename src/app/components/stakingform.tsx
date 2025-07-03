"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StakingPackage, Coin } from "../types/staking";
import LoadingSpinner from "../ui/loading";

interface StakingFormProps {
  stakingPackage: StakingPackage;
  duration: number;
  onCloseAction: () => void;
  onSubmitAction: (amount: number) => Promise<void>;
  isLoading: boolean;
}

export default function StakingForm({
  stakingPackage,
  duration,
  onCloseAction,
  onSubmitAction,
  isLoading,
}: StakingFormProps) {
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("Required")
      .min(
        stakingPackage.minAmount,
        `Minimum amount is ${stakingPackage.minAmount}`
      )
      .max(
        stakingPackage.maxAmount,
        `Maximum amount is ${stakingPackage.maxAmount}`
      ),
    agreeTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms")
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
      agreeTerms: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmitAction(Number(values.amount));
      } finally {
        setSubmitting(false);
      }
    },
    validateOnMount: true,
  });

  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + duration);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      formik.handleChange(e);
    }
  };

  const calculateEstimatedInterest = () => {
    const amount = Number(formik.values.amount || 0);
    return (amount * (stakingPackage.apy / 100) * (duration / 365)).toFixed(4);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto h-screen !mt-0">
      <div className="dark:bg-[#0A0A0A] bg-white border border-gray-200 dark:border-gray-800 rounded-xl space-y-6 max-w-md w-full my-8 p-6 shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Confirm Stake ({duration} days)
        </h3>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <label className="dark:text-gray-300 text-gray-700 text-sm sm:text-base">
                Lock Amount ({stakingPackage.coin.symbol})
              </label>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  inputMode="decimal"
                  name="amount"
                  value={formik.values.amount}
                  onChange={handleAmountChange}
                  onBlur={formik.handleBlur}
                  className="dark:bg-[#111111] bg-gray-50 text-gray-900 dark:text-gray-100 p-2 rounded-lg flex-1 min-w-[120px] border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield'
                  }}
                  disabled={isLoading}
                  aria-label="Staking amount"
                />
                <div className="flex items-center gap-1">
                  <span className="dark:text-gray-300 text-gray-600 text-sm">
                    {stakingPackage.coin.symbol}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      formik.setFieldValue("amount", stakingPackage.maxAmount)
                    }
                    className="px-2 py-1 text-black dark:text-white bg-gray-100 dark:bg-[#1E1F21] rounded-lg text-sm sm:text-base hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
                    disabled={isLoading}
                    aria-label="Set maximum amount"
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>

            {formik.touched.amount && formik.errors.amount && (
              <div className="text-red-500 text-sm">{formik.errors.amount}</div>
            )}

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="dark:text-gray-400 text-gray-600">Minimum:</div>
              <div className="dark:text-gray-200 text-gray-800 text-right">
                {stakingPackage.minAmount} {stakingPackage.coin.symbol}
              </div>
              <div className="dark:text-gray-400 text-gray-600">Maximum:</div>
              <div className="dark:text-gray-200 text-gray-800 text-right">
                {stakingPackage.maxAmount} {stakingPackage.coin.symbol}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="dark:text-gray-400 text-gray-600">Stake Date:</div>
                <div className="dark:text-gray-200 text-gray-800">{currentDate.toLocaleDateString()}</div>
                <div className="dark:text-gray-400 text-gray-600">Stake Time:</div>
                <div className="dark:text-gray-200 text-gray-800">{currentDate.toLocaleTimeString()}</div>
                <div className="dark:text-gray-400 text-gray-600">Interest Period:</div>
                <div className="dark:text-gray-200 text-gray-800">{duration} days</div>
                <div className="dark:text-gray-400 text-gray-600">Redemption Date:</div>
                <div className="dark:text-gray-200 text-gray-800">{endDate.toLocaleDateString()}</div>
                <div className="dark:text-gray-400 text-gray-600">EST APY:</div>
                <div className="dark:text-gray-200 text-gray-800">{stakingPackage.apy}%</div>
                <div className="dark:text-gray-400 text-gray-600">Estimated Interest:</div>
                <div className="dark:text-gray-200 text-gray-800">
                  {calculateEstimatedInterest()} {stakingPackage.coin.symbol}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formik.values.agreeTerms}
                  onChange={formik.handleChange}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                  disabled={isLoading}
                />
                <span className="dark:text-gray-300 text-gray-600 text-sm">
                  I agree to the {" "}
                  <span className="text-blue-500 hover:underline">
                    Cryptofleet Service Agreement
                  </span>
                </span>
              </label>
              {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                <div className="text-red-500 text-sm">{formik.errors.agreeTerms}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onCloseAction}
              className="flex-1 py-3 px-3 bg-zinc-100 dark:bg-[#1E1F21] text-gray-700 dark:text-gray-200 rounded-lg transition-colors border border-transparent dark:hover:border-white hover:border-black"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formik.isValid || isLoading || !formik.dirty}
              className="flex-1 py-2 bg-gradient-to-r from-[#ffffff] to-[#429DFA] dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#429DFA] rounded-lg text-black dark:text-white text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:from-[#ffffff] hover:enabled:to-[#3B8FF5] dark:hover:enabled:from-[#111111] dark:hover:enabled:to-[#3B8FF5]"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="h-5 w-5 text-white" />
                  Confirming...
                </>
              ) : (
                "Confirm Stake"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
