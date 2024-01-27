import { utilService } from './util.service.js'

import { Server } from '../api/server.service.js'
import { User } from '../api/user.service.js'

type Entity = User | Server
type newEntity = Omit<User, '_id'> | Omit<Server, '_id'>

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType: string, delay: number = 300): Promise<Entity[]> {
  const storedData = localStorage.getItem(entityType);
  const entities: Entity[] = storedData ? JSON.parse(storedData) : []
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

async function get(entityType: string, entityId: string): Promise<Entity> {
  const entities = await query(entityType)
  const entity = entities.find((currEntity) => (currEntity._id = entityId))
  if (!entity)
    throw new Error(
      `Could not find entityId: [${entityId}], in collection: [${entityType}]`,
    )
  return entity
}

async function post(entityType: string, newEntity: newEntity): Promise<Entity> {
  const entities = await query(entityType)
  const entityToAdd = { ...newEntity, _id: utilService.makeId() }
  let newEntities
  if (entities.length === 0) newEntities = [entityToAdd]
  else newEntities = [...entities, entityToAdd]
  _save(entityType, newEntities)
  return entityToAdd
}

async function put(entityType: string, newEntity: Entity): Promise<Entity> {
  const entities = await query(entityType)
  const entityToUpdate: Entity = { ...newEntity }
  const idx = entities.findIndex((entity) => entity._id === entityToUpdate._id)
  if (idx === -1) {
    throw new Error(
      `Could not update entityId: [${newEntity._id}] in collection :[${entityType}]`,
    )
  }
  const newEntities = entities.map((originalEntity, i) =>
    i === idx ? entityToUpdate : originalEntity,
  )
  _save(entityType, newEntities)
  return entityToUpdate
}

async function remove(entityType: string, entityId: string): Promise<string> {
  const entities = await query(entityType)
  const idx = entities.findIndex((entity) => entity._id === entityId)
  if (idx === -1) {
    throw new Error(
      `Could not remove entityId: [${entityId}] from collection :[${entityType}]`,
    )
  }
  const newEntities = entities.filter((entity) => entity._id !== entityId)
  _save(entityType, newEntities)
  return entityId
}

function _save(entityType: string, entities: Entity[]): void {
  localStorage.setItem(entityType, JSON.stringify(entities))
}
