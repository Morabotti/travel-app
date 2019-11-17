import { useState, useEffect } from 'react'
import { Travel, NewTravel, TravelEditForm } from '@types'
import { useInitialContext } from '@hooks'

import {
  fetchTravels,
  addTravel,
  deleteTravel,
  editTravel as clientEditTravel
} from '@client'

interface TravelsContext {
  loading: boolean,
  error: boolean,
  travels: Travel[],
  editTravel: TravelEditForm | null,

  onNewTravel: (newTravel: NewTravel) => void,
  onEditTravel: (travel: Travel) => void,
  onConfirmDelete: () => void,

  isNewTravelDialog: boolean,
  isConfirmDialog: null | number,

  setNewTravelDialog: (set: boolean) => void,
  setConfirmDialog: (set: null | number) => void,
  setEditTravelDialog: (set: null | Travel) => void
}

export const useTravels = (): TravelsContext => {
  const { loading, error, setError, setLoading } = useInitialContext(false, true)
  const [isNewTravelDialog, setStateNewTravelDialog] = useState(false)
  const [isConfirmDialog, setStateConfirmDialog] = useState<null | number>(null)
  const [travels, setTravels] = useState<Travel[]>([])
  const [editTravel, setEditTravel] = useState<TravelEditForm | null>(null)

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

  const onEditTravel = (editingTravel: Travel) => {
    clientEditTravel(editingTravel)
      .then(travel => {
        setTravels(travels.map(i => i.id === travel.id ? travel : i))
        setEditTravel(null)
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
  const setEditTravelDialog = (set: null | Travel) => setEditTravel(set !== null ? {
    ...set,
    cost: set.cost.toString()
  } : null)

  useEffect(() => {
    getTravels()
  }, [])

  return {
    loading,
    error,
    travels,
    editTravel,

    onNewTravel,
    onConfirmDelete,
    onEditTravel,

    isNewTravelDialog,
    isConfirmDialog,

    setNewTravelDialog,
    setConfirmDialog,
    setEditTravelDialog
  }
}
