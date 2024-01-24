import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const BotAvatar = () => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage className="p-1" src="/assets/logo.png" alt="avatar" />
    </Avatar>
  )
}
export default BotAvatar
