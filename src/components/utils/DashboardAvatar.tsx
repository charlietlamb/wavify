import {Avatar, Card, CardFooter, Image, Button} from "@nextui-org/react";

interface avatarProps{
  user: User
}
export default function DashboardAvatar({user} : avatarProps) {
  var imageSource = '';
  if(process.env.NEXT_PUBLIC_WASABI_USERS_BUCKET){
    imageSource = 'https://s3.wasabisys.com/'+process.env.NEXT_PUBLIC_WASABI_USERS_BUCKET + '/'+user.id+'/images.profile_pic.jgp'
  }else{
    imageSource = "https://i.pravatar.cc/150?u=a04258114e29026708c";
  }
  return (
    <div className="flex flex-row p-2 border-[1px] border-white rounded-[.5rem]">
        <Avatar src={imageSource} className="w-20 h-20 mr-4 text-large" />
        <div className="flex flex-col h-[100%] justify-center">
            <h2 className="user-name font-bold text-[1.5rem] leading-none">
                {user.username}
            </h2>
            <p className="leading-none user-score text-primary">
                {user.score}
            </p>
        </div>
        
    </div>
  )
}

