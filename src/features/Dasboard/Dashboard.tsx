import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toggleLoading } from 'store/ui/UISlice'

export const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => dispatch(toggleLoading(false)), 2000)
  }, [])
  return <div>Dashboard</div>
}
