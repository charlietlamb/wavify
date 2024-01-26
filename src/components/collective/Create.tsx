"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkUnique, createCollective } from "../../app/create/collective/actions";
import { AnimatedXIcon } from "../icons/x";
import { AnimatedCheckIcon } from "../icons/check";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { CreateCollective } from "../modals/CreateCollective";


interface createProps{
    user: User
}

export default function Create({user} : createProps) {
  const supabase = createClientComponentClient<Database>();
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const iconProps = {
    height:"40",
    width:"40",
    color:'#facc15'
  }


  async function handleSubmit(user : User){
    if(usernameAvailable){
      setError(false);
      setLoading(true);
      await createCollective(username, user)
      router.push(`/collective/${username}`)
    }else{
      setError(true);
    }

    setLoading(false);
  }

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function(this: any, ...args: any[]) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };
  
  const isUsernameAvailable = async (usernameToCheck: string) => {
    if(usernameToCheck===''){
      setUsernameAvailable(false);
      return;
    }
    const { data, error } = await supabase
      .from('collectives')
      .select('unique')
      .eq('unique', usernameToCheck)

    if (error) {
      console.error('Error checking username:', error);
      setUsernameAvailable(false);
    } else {
      setUsernameAvailable(data.length === 0);
    }
  };
  
  const debouncedCheckUsername = debounce(isUsernameAvailable, 100);

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowedChars = /^[a-z0-9._-]*$/;
    let inputValue = e.target.value;
    if (!allowedChars.test(inputValue)) {
      inputValue = inputValue.replace(/[^a-z0-9._-]/g, '');
    }
    setUsername(inputValue);
    debouncedCheckUsername(inputValue);
  };

  /*return (
    <section className="flex flex-col items-center h-[80vh] justify-center p-24 gap-y-4">
      <motion.h1 className="create-collective-header font-semibold text-[4rem]"
      initial= {{x: 300, opacity: 0}}
      animate= {{x:0, opacity: 1}}
      transition={{ duration: 1}}>
        Create A Collective
      </motion.h1>
      <motion.p className="w-full text-sm leading-none text-center text-muted-foreground"
        initial= {{x: 300, opacity: 0}}
        animate= {{x:0, opacity: 1}}
        transition={{ duration: 1, delay: 0.2}}>
            A unique can only contain lower case characters, numbers, hyphens, underscores and periods.
        </motion.p>
      <div className="flex flex-col gap-y-4 w-[50vw]">
        <motion.div className="flex flex-row justify-between w-full gap-x-4"
        initial= {{x: 300, opacity: 0}}
        animate= {{x:0, opacity: 1}}
        transition={{ duration: 1, delay : 0.4}}>
          <Input
            className = "text-center"
            placeholder="collective-unique"
            type="text"
            value={username}
            onChange={usernameHandler}
          />
          {usernameAvailable ? <AnimatedCheckIcon {...iconProps} />
          : <AnimatedXIcon {...iconProps}/>}
        </motion.div>
        <motion.div
        initial= {{x: 300, opacity: 0}}
        animate= {{x:0, opacity: 1}}
        transition={{ duration: 1, delay: 0.6}}>
          <Button type="submit" className="w-full" onClick={() => handleSubmit(user)}>
            { loading ? <svg width="24" height="24" stroke="#0f0f0f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='spinner'><g><circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle></g></svg>
            :'Submit'}
          </Button>
          
          {error &&
          <p className="w-full mt-2 text-sm text-center text-red-500 text-muted-foreground">
            {'This collective unique is taken.'}
          </p>}
        </motion.div>
      </div>
    </section>
  );*/
  return (
    <CreateCollective user={user}></CreateCollective>
  )
}