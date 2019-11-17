import { useState, useEffect } from 'react'
import { Travel, NewTravel } from '@types'
import { useInitialContext } from '@hooks'
import { fetchTravels, addTravel, deleteTravel } from '@client'

interface TravelsContext {
  loading: boolean,
  error: boolean,
  travels: Travel[],

  onNewTravel: (newTravel: NewTravel) => void,
  onConfirmDelete: () => void,

  isNewTravelDialog: boolean,
  isConfirmDialog: null | number,

  setNewTravelDialog: (set: boolean) => void,
  setConfirmDialog: (set: null | number) => void
}

export const useTravels = (): TravelsContext => {
  const { loading, error, setError, setLoading } = useInitialContext(false, true)
  const [isNewTravelDialog, setStateNewTravelDialog] = useState(false)
  const [isConfirmDialog, setStateConfirmDialog] = useState<null | number>(null)
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

  const onConfirmDelete = () => {
    if (isConfirmDialog === null) {
      return
    }

    deleteTravel(isConfirmDialog)
      .then(() => {
        setTravels(travels.filter(i => i.id !== isConfirmDialog))
        setStateConfirmDialog(null)
      })
  }

  const setNewTravelDialog = (set: boolean) => setStateNewTravelDialog(set)
  const setConfirmDialog = (set: null | number) => setStateConfirmDialog(set)

  useEffect(() => {
    getTravels()
  }, [])

  return {
    loading,
    error,
    travels,

    onNewTravel,
    onConfirmDelete,

    isNewTravelDialog,
    isConfirmDialog,

    setNewTravelDialog,
    setConfirmDialog
  }
}
