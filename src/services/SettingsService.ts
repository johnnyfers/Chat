import { getCustomRepository, Repository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository'
import { Setting } from '../entities/Setting'

interface ISettingsCreate {
    chat: boolean;
    username: String;
}

class SettingsService {
    private settingsRepository: Repository<Setting>;

    constructor(){
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {
        const selectUser = await this.settingsRepository.findOne({ username });

        if (selectUser) { throw new Error('user already exists'); };

        const settings = this.settingsRepository.create({
            chat,
            username
        });

        await this.settingsRepository.save(settings);

        return settings;

    }
}

export { SettingsService }