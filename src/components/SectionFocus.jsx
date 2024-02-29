const SectionFocus = () => {
    const sections = ['Mr. Rogers', 'Sports', 'Sticker Wall', 'Pittsburgh', 'Rosie'];
  
    //to-do: make this only run once per day
    // or make each day generate a specific section
    
    let num = Math.floor(Math.random() * (sections.length));
    let sectionFocus = sections[num]
    return (
        <li>Today&apos;s Focus: {sectionFocus}</li>

    )
}

export default SectionFocus