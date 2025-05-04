import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createFormSchema } from './form-schema'
import { useLinkStore } from '@/store/links.store'
import { cn } from '@/lib/utils'

const NewLink = () => {
  const { links } = useLinkStore()
  const formSchema = createFormSchema(links)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      originalUrl: "",
      shortUrl: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className='w-full md:max-w-[380px]'>
      <img
          className="mb-8 h-6 mx-auto md:mx-0"
          src="/assets/logo.svg"
          alt="Logo da brev.ly"
        />
      <div className="card relative w-full">
        <p className="text-lg mb-6">Novo link</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem >
                  <FormLabel className='flex flex-col items-start [&>*]:w-full'>
                    <span>Link Original</span>

                    <FormControl>
                      <Input placeholder="www.example.com" {...field} />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex flex-col items-start [&>*]:w-full'>
                    <span>Link Encurtado</span>

                  <FormControl>
                    <div className='relative'>
                      <Input {...field} className='pl-16.5' />
                      <p className='absolute bottom-[0.375rem] left-3 text-gray-400 text-base lowercase pointer-events-none'>brev.ly/</p>
                    </div>
                  </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className={cn("w-full", form.formState.isValid ? "" : "opacity-50")}>Salvar link</Button>
          </form>
        </Form>

      </div>
    </div>
  )
}

export default NewLink
