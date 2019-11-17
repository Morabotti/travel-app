import { useState, useEffect } from 'react'
import { Travel, NewTravel } from '@types'
import { useInitialContext } from '@hooks'
import { fetchTravels, addTravel } from '@client'

interface TravelsContext {
  loading: boolean,
  error: boolean,
  travels: Travel[],

  onNewTravel: (newTravel: NewTravel) => void,

  isNewTravelDialog: boolean,

  setNewTravelDialog: (set: boolean) => void
}

export const useTravels = (): TravelsContext => {
  const { loading, error, setError, setLoading } = useInitialContext(false, true)
  const [isNewTravelDialog, setStateNewTravelDialog] = useState(false)
  const [travels, setTravels] = useState<Travel[]>([])

  const getTravels = () => {
    fetchTravels()
      .then(t => {
        setError(false)
        setLoading(false)
        setTravels(t)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  const onNewTravel = (newTravel: NewTravel) => {
    addTravel(newTravel)
      .then(travel => {
        setTravels([...travels, travel])
        setStateNewTravelDialog(false)
      })
  }

  const setNewTravelDialog = (set: boolean) => setStateNewTravelDialog(set)

  useEffect(() => {
    getTravels()
  }, [])

  return {
    loading,
    error,
    travels,

    onNewTravel,

    isNewTravelDialog,

    setNewTravelDialog
  }
}
