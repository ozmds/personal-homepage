import React from 'react';
import './App.css';
import content from './static/content.json';
import axios from 'axios';

const getArticleList = () => {
    axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40athavan.karunakaran').then((res) => {
        console.log(res.data);
    });
}

const SectionTitleCard = (props) => (
    <div className='shadow col-4 m-3 p-4'>
        <h2 className='m-0'>{props.children}</h2>
    </div>
);

const CardList = (props) => (
    <div className="m-3">
        <ul className='list-reset row'>
            {props.children}
        </ul>
    </div>
);

const ListCard = (props) => (
    <li className={`col-${props.width} d-flex p-0`}>
        <div className='shadow p-4 m-3 w-100'>
            {props.children}
        </div>
    </li>
);

const WideListCard = (props) => (
    <li className={`w-100 d-flex justify-content-${props.justify}`}>
        <div className={`col-${props.width} d-flex p-0`}>        
            <div className='shadow p-4 m-3 w-100'>
                {props.children}
            </div>
        </div>
    </li>
);

function App() {
    getArticleList();
    return (
        <div id="app">
            <header id="header" class='shadow p-3 primary'>
                <h1 class='m-0'>{content.intro.title}</h1>
            </header>
            <main id="main" class='p-3'>
                <section id="intro" class='d-flex justify-content-start'>
                    <div class="shadow col-8 m-3 p-4">
                        <h2>{content.intro.tagline}</h2>
                        <p>{content.intro.statement}</p>
                        {content.contact.links.map((link) => (
                            <a class="btn m-2 primary" href="athavan.dev">
                                {link.text}
                            </a>
                        ))}
                    </div>
                </section>
                <section id="about" class='d-flex justify-content-end'>
                    <div class="shadow col-8 m-3 p-4 d-flex">
                        <div class="col-8">
                            <h2>{content.about.title}</h2>
                            <p>{content.about.bio}</p>
                        </div>
                        <div class="col-4 p-0">
                            <div className='w-100 h-100 image-wrap d-flex align-items-center justify-content-end'>
                                <img class="image" alt="personal" src={require('./static/personal_photo.jpg')}/>
                            </div>                            
                        </div>
                    </div>
                </section>
                <section id="skills">
                    <SectionTitleCard>{content.skills.title}</SectionTitleCard>
                    <CardList>
                        {content.skills.skills.map((category) => (
                            <ListCard width={3}>
                                <h3>{category.title}</h3>
                                <ul class='list-reset'>
                                    {category.skills.map((skill) => (
                                        <li>{skill}</li>
                                    ))}
                                </ul>
                            </ListCard>
                        ))}
                    </CardList>
                </section>
                <section id="experience">
                    <SectionTitleCard>{content.work.title}</SectionTitleCard>
                    <CardList>
                        {content.work.jobs.map((job, index) => (
                            <WideListCard width={11} justify={index % 2 === 0 ? 'start' : 'end'}>
                                <h3>{job.title}</h3>
                                <ul>
                                    {job.points.map((point) => (
                                        <li>{point}</li>
                                    ))}
                                </ul>
                            </WideListCard>
                        ))}
                    </CardList>
                </section>
                <section id="projects">
                    <SectionTitleCard>{content.projects.title}</SectionTitleCard>
                    <CardList>
                        {content.projects.projects.map((project, index) => (
                            <WideListCard width={10} justify={index % 2 === 0 ? 'start' : 'end'}>
                                <h3>{project.title}</h3>
                            </WideListCard>
                        ))}
                    </CardList>
                </section>
                <section id="articles">
                    <SectionTitleCard>{content.articles.title}</SectionTitleCard>
                </section>
                <section id="contact" class='d-flex justify-content-center'>
                    <div class='shadow col-8 m-3 p-4'>
                        <h2>{content.contact.title}</h2>
                        <p>{content.contact.text} 
                        </p>
                        {content.contact.links.map((link) => (
                            <a class="btn m-2 primary" href="athavan.dev">
                                {link.text}
                            </a>
                        ))}
                    </div>
                </section>
            </main>
            <footer id="footer" class='shadow p-3 primary text-center'>
                {content.footer.text}
            </footer>
        </div>
    );
}

export default App;
