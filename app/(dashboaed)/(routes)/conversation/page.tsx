'use client'

import * as z from 'zod'
import Heading from '@/components/Heading'
import { MessageSquare } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './constants'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { OpenAI } from 'openai'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/UserAvatar'
import BotAvatar from '@/components/BotAvatar'

const Conversation = () => {
  const router = useRouter()
  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessageParam[]>(
    []
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      const userMessage: OpenAI.ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt
      }

      const newMessages = [...messages, userMessage]
      setMessages(newMessages)
      const response = await axios.post('/api/conversation', {
        message: newMessages
      })

      setMessages((current) => [...current, response.data])

      form.reset()
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error)
      // TODO Open Pro Modal
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title="conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-col-12 gap-2"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        placeholder="Please enter your question here ..."
                        {...field}
                        className="border-0 outline-none focus-visible:ring-transparent"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No conversation started" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index: number) =>
              typeof message.content === 'string' ? (
                <div
                  key={message.content + index}
                  className={cn(
                    `p-8 w-full flex items-center gap-x-8 rounded-lg`,
                    message.role === `user`
                      ? `bg-white border border-black/10`
                      : `bg-muted`
                  )}
                >
                  {message.role === `user` ? <UserAvatar /> : <BotAvatar />}
                  {message.content}
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Conversation
