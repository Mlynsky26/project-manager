'use client'

import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { FaSignInAlt, FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Stories", href: "/stories" },
    { name: "Tasks", href: "/tasks" },
];

const Header = () => {
    const { user, logout } = useUser();
    const router = useRouter();
    const handleLogout = async () => {
        await fetch("/logout");
        logout();
        router.push("/login");
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/" className="d-flex align-items-center gap-2">ManageMe <BsPencilSquare className="text-success" /></Navbar.Brand>
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
                    {user ? (
                        <div className="d-flex align-items-center ms-2">
                            <FaRegUser className="me-1" />
                            {`${user.firstName} ${user.lastName}`}
                            <button
                                className="btn btn-outline-danger ms-2"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt className="me-1" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="btn btn-outline-primary ms-2">
                            Log in <FaSignInAlt />
                        </Link>
                    )}
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
