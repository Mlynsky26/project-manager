'use client'

import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";

const navLinks = [
    { name: "Home", href: "/"},
    { name: "Projects", href: "/projects"},
    { name: "Stories", href: "/stories"},
];

const Header = () => {
    const { user } = useUser()
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Projects Manager <BsPencilSquare className="text-success" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {navLinks.map((link, index) => (
                                <Link key={index} href={link.href} className="text-light d-flex align-items-center gap-2 nav-link">
                                    {link.name}
                                </Link>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                    {user ? <div className="d-flex align-items-center ms-2"><FaRegUser className="me-1"/>{`${user.firstName} ${user.lastName}`}</div> : <Link href="/" className="btn btn-outline-primary ms-2">Log in <FaSignInAlt /></Link>}
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
