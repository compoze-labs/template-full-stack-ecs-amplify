import React, { useEffect, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { config } from './config'
import { BackendApiClient } from './data/BackendApiClient'

export interface AppProps {
    backendApiClient: BackendApiClient
}

function App({ backendApiClient }: AppProps): JSX.Element {
    const [messageFromThing, setMessageFromThing] = useState('')
    useEffect(() => {
        backendApiClient
            .fetchThing()
            .then((thing) => {
                setMessageFromThing(thing.thingProperty)
            })
            .catch(() => {
                setMessageFromThing('There was an error fetching from thing..')
            })
    }, [backendApiClient])

    return (
        <ChakraProvider>
            <div>Message from config: {config.DISPLAY_MESSAGE}</div>
            <div>{messageFromThing}</div>
        </ChakraProvider>
    )
}

export default App
