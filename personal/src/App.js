import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import content from './static/content.json';

const SectionTitleCard = (props) => (
    <Fade bottom>
        <div className='d-flex justify-content-center justify-content-lg-start'>
            <div className='card-colour shadow col-12 col-lg-4 m-3 p-4'>
                <h2 className='m-0'>{props.children}</h2>
            </div>
        </div>
    </Fade>
);

SectionTitleCard.propTypes = {
    children: PropTypes.element
};

const SectionCard = (props) => (
    <Fade bottom>
        <div>
            <div className={`d-flex justify-content-center justify-content-lg-${props.justify}`}>
                <div className={`card-colour shadow col-12 col-lg-8 m-3 p-4 ${props.flex ? 'd-flex' : ''}`}>
                    {props.children}
                </div>
            </div>
        </div>
    </Fade>
);

SectionCard.propTypes = {
    justify: PropTypes.string,
    flex: PropTypes.string,
    children: PropTypes.element
};

const CardList = (props) => (
    <div className='m-3'>
        <ul className='list-reset row'>
            {props.children}
        </ul>
    </div>
);

CardList.propTypes = {
    children: PropTypes.element
};

const ListCard = (props) => (
    <Fade bottom>
        <li className={`col-12 col-lg-${props.width} d-flex p-0`}>
            <div className='card-colour shadow p-4 m-3 w-100'>
                {props.children}
            </div>
        </li>
    </Fade>
);

ListCard.propTypes = {
    width: PropTypes.number,
    children: PropTypes.element
};

const WideListCard = (props) => (
    <Fade bottom>
        <li className={`w-100 d-flex justify-content-${props.justify}`}>
            <div className={`col-12 col-lg-${props.width} d-flex p-0`}>
                <div className='card-colour shadow p-4 m-3 w-100 d-flex'>
                    {props.children}
                </div>
            </div>
        </li>
    </Fade>
);

WideListCard.propTypes = {
    justify: PropTypes.string,
    width: PropTypes.number,
    children: PropTypes.element
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    componentDidMount() {
        axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40athavan.karunakaran').then((res) => {
            if (Object.prototype.hasOwnProperty.call(res.data, 'items')) {
                this.setState({ articles: res.data.items });
            }
        });
    }

    render() {
        return (
            <div id='app'>
                <header id='header' className='shadow p-3 primary'>
                    <h1 className='m-0'>{content.intro.title}</h1>
                </header>
                <main id='main' className='p-3'>
                    <section id='intro'>
                        <SectionCard justify='start'>
                            <h2 className='h1'>{content.intro.tagline}</h2>
                            <p>{content.intro.statement}</p>
                            {content.contact.links.map((link) => (
                                <a className='btn m-2 button-colour' key={link.text} target='_blank' rel='noopener noreferrer' href={link.link}>
                                    {link.text}
                                </a>
                            ))}
                        </SectionCard>
                    </section>
                    <section id='about'>
                        <SectionCard justify='end' flex>
                            <div className='col-12 col-lg-8'>
                                <h2>{content.about.title}</h2>
                                <p>{content.about.bio}</p>
                            </div>
                            <div className='col-4 p-0 d-none d-lg-block'>
                                <div className='w-100 h-100 image-wrap d-flex align-items-center justify-content-end'>
                                    <img className='image' alt='personal' src={require('./static/personal_photo.jpg')}/>
                                </div>
                            </div>
                        </SectionCard>
                    </section>
                    <section id='projects'>
                        <SectionTitleCard>{content.projects.title}</SectionTitleCard>
                        <CardList>
                            {content.projects.projects.map((project, index) => (
                                <WideListCard key={project.text} width={10} justify={index % 2 === 0 ? 'start' : 'end'}>
                                    <div className='col-12 col-lg-8'>
                                        <h3>{project.title}</h3>
                                        <p>{project.text}</p>
                                        {project.links.map((link) => (
                                            <a key={link.text} className='btn m-2 button-colour' target='_blank' rel='noopener noreferrer' href={link.link}>
                                                {link.text}
                                            </a>
                                        ))}
                                    </div>
                                    <div className='col-4 p-0 d-none d-lg-block'>
                                        <div className='w-100 h-100 image-wrap d-flex align-items-center justify-content-end'>
                                            <img className='image' alt='personal' src={require(`${project.image}`)}/>
                                        </div>
                                    </div>
                                </WideListCard>
                            ))}
                        </CardList>
                    </section>
                    <section id='skills'>
                        <SectionTitleCard>{content.skills.title}</SectionTitleCard>
                        <CardList>
                            {content.skills.skills.map((category) => (
                                <ListCard key={category.title} width={3}>
                                    <h3>{category.title}</h3>
                                    <ul className='list-reset'>
                                        {category.skills.map((skill) => (
                                            <li key={skill}>{skill}</li>
                                        ))}
                                    </ul>
                                </ListCard>
                            ))}
                        </CardList>
                    </section>
                    <section id='experience' className='d-none d-lg-block'>
                        <SectionTitleCard>{content.work.title}</SectionTitleCard>
                        <CardList>
                            {content.work.jobs.map((job, index) => (
                                <WideListCard key={job.title} width={11} justify={index % 2 === 0 ? 'start' : 'end'}>
                                    <div className='col-12 col-lg-8'>
                                        <h3>{job.title}</h3>
                                        <ul>
                                            {job.points.map((point) => (
                                                <li key={point}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='col-4 p-0 d-none d-lg-block'>
                                        <div className='w-100 h-100 image-wrap d-flex align-items-center justify-content-end'>
                                            <img className='image' alt='personal' src={require(`${job.image}`)}/>
                                        </div>
                                    </div>
                                </WideListCard>
                            ))}
                        </CardList>
                    </section>
                    <section id='articles'>
                        <SectionTitleCard>{content.articles.title}</SectionTitleCard>
                        <CardList>
                            {this.state.articles.map((article) => (
                                <ListCard key={article.title} width={4}>
                                    <a className='link-colour' target='_blank' rel='noopener noreferrer' href={article.link}>
                                        <div className='card-image-wrap'>
                                            <img className='card-image' alt='personal' src={article.thumbnail}/>
                                        </div>
                                        <h3 className='mt-3 h4'>{article.title}</h3>
                                    </a>
                                </ListCard>
                            ))}
                        </CardList>
                    </section>
                    <section id='contact'>
                        <SectionCard justify='center'>
                            <h2>{content.contact.title}</h2>
                            <p>{content.contact.text}
                            </p>
                            {content.contact.links.map((link) => (
                                <a key={link.text} className='btn m-2 button-colour' target='_blank' rel='noopener noreferrer' href={link.link}>
                                    {link.text}
                                </a>
                            ))}
                        </SectionCard>
                    </section>
                </main>
                <footer id='footer' className='shadow p-3 primary text-center'>
                    {content.footer.text}
                </footer>
            </div>
        );
    }
}

export default App;
