import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Textarea } from "./ui/textarea"
import { ToastContainer, toast } from "react-toastify"

export const FormComponent = () => {
  const form = useForm({ defaultValues: defaultValues })
  const { handleSubmit, control, formState: { isSubmitting, isSubmitted, isSubmitSuccessful } } = form
  console.log(isSubmitting, isSubmitted)
  const onSubmit = async (data: any) => {
    console.log(data) 
    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    if (!email) {
      toast.error("Something went wrong. Please try again by clicking on the link from the email.")
      throw new Error("Email is required")
    }
    const request=  fetch('https://soul-robokassa-sozdatel33.pythonanywhere.com/api/email/julia/new-req/', {
      method: 'POST',
      body: JSON.stringify({
        user_email: email,
        answers: data
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    toast.promise(request, {
      pending: "Sending...",
      success: "Form submitted successfully. Thank you for your time!",
      error: "Something went wrong. Please try again by clicking on the link again from the email."
    })
    await request
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 mt-8"
        onSubmit={handleSubmit(onSubmit)}>
          {isSubmitting && <div className="absolute left-0 top-0 w-full h-full bg-white/70 z-10 animate-pulse"></div>}
          {isSubmitSuccessful && <div className="absolute left-0 top-0 w-full h-full rounded-lg bg-white/70 z-10 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-bold">Thank you for your time!</h1>
              <p className="text-sm text-gray-500">The information sent successfully.</p>
            </div>
          </div>}
        <CheckboxWithLabel
          control={control}
          name="1"
          label="Updates on your personal or family, and financial situation"
        />
        <CheckboxWithLabel
          control={control}
          name="2"
          label="Review or update of beneficiaries (incl. avoiding naming minors)"
        />
        <CheckboxWithLabel
          control={control}
          name="3"
          label="Living benefit rider review (chronic, critical, terminal illness. Some clients outside of NY might be eligible for adding an Alzheimer's rider for policies issued before .......)"
        />
        <CheckboxWithLabel
          control={control}
          name="4"
          label="Possible policy improvements and rate reduction (non-smoker status, improved health)"
        />
        <CheckboxWithLabel
          control={control}
          name="5"
          label="Coverage for spouse, parent, or children (we recommend every member of the family to carry at least some life and living benefit protections)"
        />
        <CheckboxWithLabel
          control={control}
          name="6"
          label="Full or partial Term policy conversion into permanent insurance: NLG has 2 great options -Whole life and Indexed Universal Life (should be chosen and tailored to your individual preference for risk and budget)"
        />
        <CheckboxWithLabel
          control={control}
          name="7"
          label="Children's protection or college funding (cash value life insurance is a great way to offer same valuable protection for your children, while also accumulating cash value which can become a great asset for the child later in life)"
        />
        <CheckboxWithLabel
          control={control}
          name="8"
          label="Income protection (long-term disability) or long-term care planning (people as early as 40 can start planning)"
        />
        <CheckboxWithLabel
          control={control}
          name="9"
          label="Retirement planning options (tax-advantaged income strategies)"
        />
        <CheckboxWithLabel
          control={control}
          name="10"
          label="Estate planning: wills, POA, guardianship, living will"
        />
        <CheckboxWithLabel
          control={control}
          name="11"
          label="Medical, dental, vision, or critical illness coverage"
        />
        <FormField
          control={control}
          name="12"
          render={({ field }) => (
            <FormItem className="mt-8">
              <FormLabel>Other questions or updates you'd like to share (please write here)</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[150px]" placeholder="Please share any other questions or updates..." />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="cursor-pointer " type="submit">Send</Button>
      </form>
      <ToastContainer position="bottom-right" pauseOnHover={false} pauseOnFocusLoss={false} />
    </Form>
  )
}

const defaultValues = {
  "1": false,
  "2": false,
  "3": false,
  "4": false,
  "5": false,
  "6": false,
  "7": false,
  "8": false,
  "9": false,
  "10": false,
  "11": false,
  "12": "",
}

const CheckboxWithLabel = ({
  control,
  label,
  name,
}: {
  control?: any
  label?: string
  name: string
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex gap-3">
          <FormControl>
            <Checkbox {...field} onCheckedChange={field.onChange} className="bg-gray-100" />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </FormItem>
      )}
    />
  )
}
