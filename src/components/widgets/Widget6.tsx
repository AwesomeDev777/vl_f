import React from 'react'
import { Avatar, Button, RichList, Widget1 } from '@blueupcode/components'
import Image from 'next/image'
import Link from 'next/link'

const Widget6Component = () => {
	const [data] = React.useState({
		image: '/images/avatar/blank.webp',
		name: 'Jackson Bradshaw',
		detail: 'Office Manage, San Francisco',
		feed: (
			<>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
				magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat.
			</>
		),
		link: '#',
		count: 32,
	})

	return (
		<Widget1>
			<Widget1.Display top size="sm" className="justify-content-between bg-primary text-white">
				<Widget1.Group>
					<Widget1.Addon>
						<Button variant="label-light">2019</Button>
					</Widget1.Addon>
				</Widget1.Group>
				<Widget1.Group>
					<Widget1.Title>Personal profile</Widget1.Title>
				</Widget1.Group>
			</Widget1.Display>
			<Widget1.Body>
				{/* BEGIN Rich List */}
				<RichList.Item className="p-0 mb-3">
					<RichList.Addon addonType="prepend">
						{/* BEGIN Avatar */}
						<Avatar display>
							<Image src={data.image} layout="fill" alt="Avatar iamge" />
						</Avatar>
						{/* END Avatar */}
					</RichList.Addon>
					<RichList.Content>
						<RichList.Title>{data.name}</RichList.Title>
						<RichList.Subtitle>{data.detail}</RichList.Subtitle>
					</RichList.Content>
					<RichList.Addon addonType="append" className="d-flex flex-column">
						<h3 className="font-weight-bolder mb-0">{data.count}</h3>
						<small className="text-muted">Comments</small>
					</RichList.Addon>
				</RichList.Item>
				{/* END Rich List */}
				<p className="text-level-1 text-justify">{data.feed}</p>
				<Link href={data.link} passHref>
					<Button variant="label-primary" width="wide">
						Read more
					</Button>
				</Link>
			</Widget1.Body>
		</Widget1>
	)
}

export default Widget6Component
