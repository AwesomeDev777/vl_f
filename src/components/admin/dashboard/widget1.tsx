import React, { ReactNode } from 'react'
import { Col, Portlet, ProgressBar, Row, Widget4 } from '@blueupcode/components'
import { ProgressBarVariant } from '@blueupcode/components/progress/ProgressBar'
import * as FeatherIcon from 'react-feather'

const Widget1 = () => {
	const [list] = React.useState([
		{
			title: 'Invoices Awaiting Payment',
			highlight: '2/2',
			progress: 100,
			isProgress: true,
			variant: "success",
            icon: <FeatherIcon.Activity/>
		},
		{
			title: 'Converted Leads',
			highlight: '0/0',
			progress: 0,
			isProgress: true,
			variant: "danger",
            icon: <FeatherIcon.TrendingUp/>
		},
		{
			title: 'Projects In Progress',
			highlight: '2/3',
			progress: 67,
            isProgress: true,
			variant: "primary",
            icon: <FeatherIcon.TrendingDown/>
		},
		{
			title: 'Tasks Not Finished',
			highlight: '0/1',
			progress: 0,
			isProgress: true,
			variant: "danger",
            icon: <FeatherIcon.File/>
		},
	])

	return (
				<Row className="g-2">
					{list.map((data, index) => (
						<Col sm="3" key={index}>
                            <Portlet>
                                <Portlet.Body>
                                    <Widget7ComponentProgress
                                        title={data.title}
                                        highlight={data.highlight}
                                        variant={data.variant}
                                        icon={data.icon}
                                        progress={data.progress as number}
                                    />
                                </Portlet.Body>    
                            </Portlet>
						</Col>
					))}
				</Row>
	)
}

const Widget7ComponentDisplay: React.FC<Widget7ComponentDisplayProps> = ({ title, highlight, ...props }) => {
	return (
		<Widget4 {...props}>
			<Widget4.Group>
				<Widget4.Display>
					<Widget4.Subtitle>{title}</Widget4.Subtitle>
					<Widget4.Highlight>{highlight}</Widget4.Highlight>
				</Widget4.Display>
			</Widget4.Group>
		</Widget4>
	)
}

interface Widget7ComponentDisplayProps {
	title: string
	highlight: string
}

const Widget7ComponentProgress: React.FC<Widget7ComponentProgressProps> = ({
	title,
	highlight,
	progress,
    variant,
    icon,
	...props
}) => {
	return (
		<Widget4 {...props}>
			<Widget4.Group>
				<Widget4.Display>
                    <Row>
                        <Col md={2}>
                            {icon}
                        </Col>
                        <Col md={10}>
                            <Widget4.Subtitle>{title}</Widget4.Subtitle>
                        </Col>
                    </Row>
				</Widget4.Display>
				<Widget4.Addon>
					<Widget4.Subtitle>{highlight}</Widget4.Subtitle>
				</Widget4.Addon>
			</Widget4.Group>
			<ProgressBar striped now={progress} variant={variant as ProgressBarVariant} />
		</Widget4>
	)
}

interface Widget7ComponentProgressProps {
	title: string
	highlight: string
	progress: number
    variant: string
    icon: ReactNode
}

export default Widget1
