import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.scss'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'


export default function Home() {

  const [user, setUser] = useState<string>('')
  const [load, setLoad] = useState<boolean>(false)
  const [userList, setUserList] = useState()

  const router = useRouter()

  async function getAllUsers() {
    await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async (res) => {
        var result = await res.json()
        setUserList(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function login() {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user
      })
    })
      .then(async (res) => {
        router.push('/dashboard')
        toast.success(`Bem-vindo ${user}!`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllUsers()
  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.content}>

        <div className={styles.top}>
          <h1>Olá! Bem-vindo ao <span>Department Control</span></h1>
          <p>Para logar, insira seu Nome</p>
        </div>

        <div className={styles.form}>
          <Input
            type='text'
            required
            placeholder={'Seu nome'}
            value={user}
            onchange={(e: string) => setUser(e)}
            theme='white'
          />

          <Button
            type='submit'
            theme='primary'
            disabled={!user ? true : false}
            placeholder='Entrar'
            onClick={() => {login()}}
          />

        </div>
      </div>
    </div>
  )
}
