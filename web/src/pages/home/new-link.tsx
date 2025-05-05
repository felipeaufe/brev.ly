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
import { http } from '@/api/api'
import { toast } from 'sonner'
import { useState } from 'react'

const NewLink = () => {
  const [ loading, setLoading ] = useState(false);
  const { links, addLink } = useLinkStore()
  const formSchema = createFormSchema(links)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      link: "",
      code: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    http.shortLink.create(values).then((response) => {
      form.reset()
      toast.success("Link criado com sucesso!")

      addLink(response);
      
    }).finally(() => setLoading(false))
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
              name="link"
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
              name="code"
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
            <Button className={cn("w-full", form.formState.isValid ? "" : "opacity-50")} disabled={loading}>{ loading ? "Salvando..." : "Salvar link"}</Button>
          </form>
        </Form>

      </div>
    </div>
  )
}

export default NewLink
