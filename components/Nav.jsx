"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Nav = () => {
    // const isUserLoggedIn = true;
    const {data:session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToogleDown] = useState(false)
    useEffect(()=>{
        const setUPProvider = async()=>{
            const response = await getProviders();
            setProviders(response);
        }
        setUPProvider()
    },[])
  return (
   <nav className='flex-between w-full mb-16 pt-3'>
    <Link href="/" className='flex gap-2 flex-center'>
        <Image
        src="/assets/images/logo.svg"
        alt='Promptopia Logo'
        width={30}
        height={30}
        className='object-contain'/>
        <p className='logo_text'>Promptopia</p>
    </Link>

    {/* desktop Navigation */}
    <div className='sm:flex hidden'>
        {session?.user?(
            <div className='flex gap-3 md:gap-5'>
                <Link className='black_btn'
                href="/create-prompt">
                    Create Post
                </Link>
                
                <button className='button'
                onClick={signOut}>Sign Out</button>
                <Link href="/profile">
                <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                />
                
                </Link>
            </div>
        ):(
            <>
                {
                    providers &&
                    Object.values(providers).map((provider)=>(
                        <button
                        type='button'
                        key={provider.name}
                        onClick={()=>signIn(provider.id)}
                        className='black_btn'
                        >
                            Sign In
                        </button>
                    ))
                }
            </>
        )}
    </div>

    {/* mobile navigation */}
    <div className='sm:hidden flex relative'>
        {session?.user?(
            <div className='flex'>
                <Image
                      src="/assets/images/logo.svg"
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={()=>setToogleDown((prev)=>!prev)}
                />
                {toggleDropdown && (
                    <div className='dropdown'>
                        <Link
                        href="/profile"
                        className='dropdown_link'
                        onClick={()=>setToogleDown(false)}
                        >My Profile
                        </Link>
                        <Link
                        href="/create-prompt"
                        className='dropdown_link'
                        onClick={()=>setToogleDown(false)}
                        >Create Prompt
                        </Link>
                        <button
                        type='button'
                        onClick={()=>{setToogleDown(false)
                        signOut()}}
                        className='mt-5 w-full black_btn'
                        >
                        Sign Out
                        </button>
                    </div>
                )}
            </div>
        ):(
            <>
                {
                    providers &&
                    Object.values(providers).map((provider)=>(
                        <button
                        type='button'
                        key={provider.name}
                        onClick={()=>signIn(provider.id)}
                        className='black_btn'
                        >
                            Sign In
                        </button>
                    ))
                }
            </>
        )}
    </div>
   </nav>
  )
}

export default Nav