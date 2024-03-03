const SectionFocus = () => {
    const sections = ['Mr. Rogers', 'Sports', 'Sticker Wall', 'Pittsburgh', 'Rosie'];
    
    //to-do: make this only run once per day
    //will have to connect to firebase to make
    // it consistent across users
    // or make each day generate a specific section

    let num = Math.floor(Math.random() * (sections.length));
    let sectionFocus = (sections[num])
    return (
       <ul>
         <li>Today&apos;s Focus: {sectionFocus}</li>
       </ul>

    )
}

export default SectionFocus