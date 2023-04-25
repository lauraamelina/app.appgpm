import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';

export default function TimelineSequences({ sequences }) {

    function formatedDate(date) {
        const dateFormated = new Date(date)
        return dateFormated.toLocaleDateString()

    }


    return (
        <Timeline position="alternate" className='mt-4'>
            {sequences && sequences.map(sequence =>
                <TimelineItem key={sequence.id} className='mt-2'>
                    <TimelineOppositeContent color="text.secondary">
                        {formatedDate(sequence?.updated_at)}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color="primary"/>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography variant="h6">{sequence?.time?.nombre}</Typography>
                        <Typography> <LocationOnIcon /> {sequence?.ubicacion}</Typography>
                        <Typography> <InfoIcon /> {sequence?.descripcion}</Typography>
                    </TimelineContent>
                </TimelineItem>
            )}
        </Timeline>

    )
}
